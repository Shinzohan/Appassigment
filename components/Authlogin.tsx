"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, Controller, Control } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { auth } from "@/firebase/client";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { FirebaseError } from "firebase/app";
import { signIn, signUp } from "@/lib/actions/auth.action";

// Material UI Components
import {
  Box,
  Typography,
  TextField,
  Button,
  CircularProgress,
  Link as MuiLink,
  Paper,
  Chip,
  Fade,
  Backdrop,
  Snackbar,
  Alert,
  AlertColor,
} from "@mui/material";

// Schema definitions
const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(3),
});

const signUpSchema = z.object({
  name: z.string().min(3, "Name is required"),
  email: z.string().email(),
  password: z.string().min(3),
});

type FormType = "sign-in" | "sign-up";
type SignInType = z.infer<typeof signInSchema>;
type SignUpType = z.infer<typeof signUpSchema>;
type FormSchemaType = (SignInType | SignUpType) & { type?: FormType };

const Authlogin = ({ type }: { type: FormType }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success" as AlertColor,
  });

  const isSignIn = type === "sign-in";
  const formSchema = isSignIn ? signInSchema : signUpSchema;

  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema) as any,
    defaultValues: isSignIn
      ? { email: "", password: "" }
      : { name: "", email: "", password: "" },
  });

  const showToast = (message: string, severity: AlertColor) => {
    setSnackbar({ open: true, message, severity });
  };

  const handleCloseSnackbar = () => {
    setSnackbar(prev => ({ ...prev, open: false }));
  };

  const onSubmit = async (data: FormSchemaType) => {
    setIsLoading(true);
    try {
      if (!isSignIn) {
        const { name, email, password } = data as SignUpType;
        
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        await sendEmailVerification(userCredential.user);

        const result = await signUp({
          uid: userCredential.user.uid,
          name,
          email,
          password,
        });

        if (!result.success) {
          showToast(result.message, "error");
          return;
        }

        showToast("Account created. Please verify your email.", "success");
        router.push("/sign-in");
      } else {
        const { email, password } = data as SignInType;

        const userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );

        if (!userCredential.user.emailVerified) {
          showToast("Please verify your email before signing in.", "error");
          await sendEmailVerification(userCredential.user);
          return;
        }

        const idToken = await userCredential.user.getIdToken();

        if (!idToken) {
          showToast("Sign in failed. Try again.", "error");
          return;
        }

        await signIn({ email, idToken });

        showToast("Signed in successfully.", "success");
        router.push("/");
      }
    } catch (error) {
      if (error instanceof FirebaseError) {
        const messages: Record<string, string> = {
          "auth/email-already-exists": "Email already in use",
          "auth/email-already-in-use": "Email already in use",
          "auth/invalid-email": "Invalid email address",
          "auth/operation-not-allowed": "Email/password not enabled",
          "auth/user-not-found": "No account with this email",
          "auth/wrong-password": "Incorrect password",
          "auth/too-many-requests": "Too many attempts, try later",
          "auth/network-request-failed": "Network error",
          "auth/invalid-credential": "Invalid credentials",
        };
        showToast(messages[error.code] || "An error occurred", "error");
      } else {
        showToast("Unexpected error. Try again.", "error");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Paper elevation={10} sx={{ 
      p: { xs: 3, md: 5 }, 
      maxWidth: 560, 
      mx: "auto", 
      my: 8,
      borderRadius: 3,
      boxShadow: '0px 8px 24px rgba(0, 0, 0, 0.1)'
    }}>
      <Box textAlign="center" mb={4}>
        <Typography variant="h4" fontWeight={700} color="primary.main" gutterBottom>
          Appassignment
        </Typography>
        <Chip 
          label="This is a Assignment" 
          color="primary" 
          variant="outlined"
          sx={{ 
            px: 2,
            py: 1,
            fontSize: '0.9rem',
            borderWidth: 2,
            '& .MuiChip-label': { px: 0.5 }
          }}
        />
      </Box>

      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Box display="flex" flexDirection="column" gap={2.5}>
          {!isSignIn && (
            <Controller
              name="name"
              control={form.control as Control<SignUpType>}
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  label="Full Name"
                  placeholder="John Doe"
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                  fullWidth
                  variant="outlined"
                  sx={{ 
                    '& .MuiOutlinedInput-root': { 
                      borderRadius: 2,
                      fieldset: { borderWidth: 2 }
                    }
                  }}
                />
              )}
            />
          )}

          <Controller
            name="email"
            control={form.control}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                label="Email Address"
                type="email"
                placeholder="john@example.com"
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
                fullWidth
                variant="outlined"
                sx={{ 
                  '& .MuiOutlinedInput-root': { 
                    borderRadius: 2,
                    fieldset: { borderWidth: 2 }
                  }
                }}
              />
            )}
          />

          <Controller
            name="password"
            control={form.control}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                label="Password"
                type="password"
                placeholder="••••••••"
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
                fullWidth
                variant="outlined"
                sx={{ 
                  '& .MuiOutlinedInput-root': { 
                    borderRadius: 2,
                    fieldset: { borderWidth: 2 }
                  }
                }}
              />
            )}
          />

          <Button
            variant="contained"
            type="submit"
            disabled={isLoading}
            fullWidth
            size="large"
            sx={{
              py: 1.5,
              fontSize: '1rem',
              fontWeight: 600,
              textTransform: 'none',
              borderRadius: 2,
              boxShadow: 'none',
              '&:hover': {
                boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
              
              },
              transition: 'all 0.2s ease'
            }}
          >
            {isLoading ? (
              <Box display="flex" alignItems="center" justifyContent="center">
                <CircularProgress size={24} color="inherit" sx={{ mr: 2 }} />
                {isSignIn ? "Signing In..." : "Creating Account..."}
              </Box>
            ) : (
              <>{isSignIn ? "Sign In" : "Create Account"}</>
            )}
          </Button>
        </Box>
      </form>

      <Typography mt={3} textAlign="center" color="text.secondary">
        {isSignIn ? "Don't have an account?" : "Already have an account?"}
        <MuiLink
          component="button"
          onClick={() => {
            setIsTransitioning(true);
            router.push(isSignIn ? "/sign-up" : "/sign-in");
          }}
          sx={{ 
            ml: 1, 
            fontWeight: 600,
            color: 'primary.main',
            '&:hover': { 
              color: 'primary.dark',
              textDecoration: 'underline'
            }
          }}
        >
          {isSignIn ? "Sign Up" : "Sign In"}
        </MuiLink>
      </Typography>

      <Backdrop 
        open={isTransitioning} 
        sx={{ 
          zIndex: (theme) => theme.zIndex.drawer + 1,
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          backdropFilter: 'blur(4px)'
        }}
      >
        <Fade in={isTransitioning}>
          <CircularProgress 
            color="primary" 
            size={60} 
            thickness={4}
            sx={{ animationDuration: '800ms' }}
          />
        </Fade>
      </Backdrop>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          severity={snackbar.severity}
          variant="filled"
          sx={{ 
            width: '100%',
            boxShadow: 2,
            alignItems: 'center',
            fontSize: '0.9rem'
          }}
          onClose={handleCloseSnackbar}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Paper>
  );
};

export default Authlogin;