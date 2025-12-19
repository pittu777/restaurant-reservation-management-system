import { useEffect } from 'react';
import './App.css'
import { checkAuth } from './features/auth/authSlice.ts';
import AppRoutes from './routes/Approutes.tsx'
import { useAppDispatch, useAppSelector } from './app/hooks.ts';

function App() {
   const dispatch = useAppDispatch();
  const { isInitialized } = useAppSelector((state) => state.auth);

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  if (!isInitialized) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p>Loading...</p>
        </div>
      </div>
    );
  }


  return (
    <>
      <AppRoutes/>
    </>
  )
}

export default App
