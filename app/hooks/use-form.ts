/* eslint-disable @typescript-eslint/no-explicit-any */
import { FormEvent, useEffect, useState, useTransition } from "react";
import { toast } from "sonner";

interface FormState {
  success: boolean;
  message: string | null;
  fieldErrors: Record<string, string[]> | null;
}

type useFormProps = {
  action: (data: FormData, extraData?: any) => Promise<FormState>;
  onSuccess?: () => Promise<void> | void;
  initialState?: FormState;
  resetForm?: boolean;
};

export function useForm({
  action,
  onSuccess,
  initialState,
  resetForm,
}: useFormProps) {
  const [isPending, startTransition] = useTransition();
  const [showError, setShowError] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [formState, setFormState] = useState(
    initialState ?? { success: false, message: null, fieldErrors: null }
  );

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>,
    extraData?: any
  ) {
    event.preventDefault();

    const form = event.currentTarget;
    const data = new FormData(form);

    startTransition(async () => {
      const state = await action(data, extraData);
      if (state) {
        if (state.success && onSuccess) await onSuccess();
        if (state.success && resetForm) form.reset();
        if (!state.success && state.message) setShowError(true);
        if (state.success && state.message) setShowSuccess(true);

        setFormState(state);
      }
    });
  }

  useEffect(() => {
    if (showError) toast.error(formState.message);
    setShowError(false);
  }, [showError, formState.message]);

  useEffect(() => {
    if (showSuccess) toast.success(formState.message);

    setShowSuccess(false);
  }, [showSuccess, formState.message]);

  return [formState, handleSubmit, isPending] as const;
}
