import { useState, useCallback } from "react";
import { unstable_batchedUpdates } from "react-dom";
import { useApolloClient } from "@apollo/client";
import invariant from "invariant";
import { CompiledArtefactModule } from "relay-compiler-language-graphitation";
import { useCompiledFragment } from "./useCompiledFragment";
import { FragmentReference } from "./types";

export interface Disposable {
  dispose(): void;
}

export type RefetchFn<Variables extends {} = {}> = (
  variables: Partial<Variables>,
  options?: RefetchOptions
) => Disposable;

export interface RefetchOptions {
  onCompleted?: (error: Error | null) => void;
  fetchPolicy?: "network-only" | "no-cache";
}

/**
 * These do not exist in the Relay API and should not be exported from the package.
 */
export interface PrivateRefetchOptions extends RefetchOptions {
  /**
   * Returns the fetched data.
   */
  UNSTABLE_onCompletedWithData?: (
    error: Error | null,
    data: Record<string, any> | null
  ) => void;
}

export function useCompiledRefetchableFragment(
  documents: CompiledArtefactModule,
  fragmentReference: FragmentReference
): [data: {}, refetch: RefetchFn] {
  const { executionQueryDocument, metadata } = documents;
  invariant(
    metadata && metadata.mainFragment,
    "useRefetchableFragment(): Expected metadata to have been extracted from " +
      "the fragment. Did you forget to invoke the compiler?"
  );
  invariant(
    executionQueryDocument,
    "useRefetchableFragment(): Expected fragment `%s` to be refetchable when " +
      "using `useRefetchableFragment`. Did you forget to add a @refetchable " +
      "directive to the fragment?",
    metadata.mainFragment.name
  );

  const client = useApolloClient();
  const [
    fragmentReferenceWithOwnVariables,
    setFragmentReferenceWithOwnVariables,
  ] = useState(fragmentReference);
  const data = useCompiledFragment(
    documents,
    fragmentReferenceWithOwnVariables
  );

  const refetch = useCallback<RefetchFn>(
    (variablesSubset, options?: PrivateRefetchOptions) => {
      const variables = {
        ...fragmentReference.__fragments,
        ...variablesSubset,
        id: fragmentReference.id,
      };
      const observable = client.watchQuery({
        fetchPolicy: options?.fetchPolicy ?? "network-only",
        query: executionQueryDocument,
        variables,
      });
      let subscription:
        | ZenObservable.Subscription
        | undefined = observable.subscribe(
        ({ data, error }) => {
          // Be sure not to keep a retain cycle
          subscription!.unsubscribe();
          subscription = undefined;

          unstable_batchedUpdates(() => {
            if (options?.UNSTABLE_onCompletedWithData) {
              options.UNSTABLE_onCompletedWithData(error || null, data);
            } else {
              options?.onCompleted?.(error || null);
            }
            if (!error) {
              const { id: _, ...variablesToPropagate } = variables;
              setFragmentReferenceWithOwnVariables({
                id: fragmentReference.id,
                __fragments: {
                  ...fragmentReference.__fragments,
                  ...variablesToPropagate,
                },
              });
            }
          });
        },
        (error) => {
          // Be sure not to keep a retain cycle
          subscription!.unsubscribe();
          subscription = undefined;

          if (options?.UNSTABLE_onCompletedWithData) {
            options.UNSTABLE_onCompletedWithData(error, null);
          } else {
            options?.onCompleted?.(error);
          }
        }
      );
      return { dispose: () => subscription?.unsubscribe() };
    },
    [
      client,
      executionQueryDocument,
      fragmentReference.id,
      fragmentReference.__fragments,
    ]
  );

  return [data, refetch];
}
