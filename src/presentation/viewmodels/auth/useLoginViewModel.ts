import { useMemo, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../infrastructure/store';
import { setLoading, setUser, setError, clearError } from '../../../infrastructure/store/slices/authSlice';
import { LoginUseCase } from '../../../core/usecases';
import { authRepository } from '../../../data/repositories/AuthRepository';

interface LoginForm {
  email: string;
  password: string;
}

/**
 * Login ViewModel - MVVM Pattern
 * Connects View with Domain UseCases and manages presentation state.
 */
export const useLoginViewModel = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isLoading, error, isAuthenticated } = useAppSelector((state) => state.auth);

  // Form state
  const [form, setForm] = useState<LoginForm>({ email: '', password: '' });

  // UseCase instance (memoized)
  const loginUseCase = useMemo(() => new LoginUseCase(authRepository), []);

  // Handle input change
  const handleInputChange = useCallback(
    (field: keyof LoginForm) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setForm((prev) => ({ ...prev, [field]: e.target.value }));
      if (error) dispatch(clearError());
    },
    [error, dispatch]
  );

  // Handle login submit
  const handleLogin = useCallback(async () => {
    try {
      dispatch(setLoading(true));
      const { user } = await loginUseCase.execute(form.email, form.password);
      dispatch(setUser(user));
      navigate('/dashboard');
    } catch (err) {
      dispatch(setError(err instanceof Error ? err.message : 'Login failed'));
    }
  }, [form, loginUseCase, dispatch, navigate]);

  // Handle form submit
  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      handleLogin();
    },
    [handleLogin]
  );

  return {
    // State
    form,
    isLoading,
    error,
    isAuthenticated,

    // Actions
    handleInputChange,
    handleSubmit,
    clearError: () => dispatch(clearError()),
  };
};
