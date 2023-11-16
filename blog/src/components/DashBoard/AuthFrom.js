import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Grid, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    confirmPassword: '',
  });
  const [formErrors, setFormErrors] = useState({});
  const [submitStatus, setSubmitStatus] = useState({
    success: false,
    message: '',
  });

  let navigate = useNavigate(); // Hook pour naviguer vers une autre page

  const validateForm = () => {
    const errors = {};
    if (!formData.email) {
      errors.email = "L'adresse email est requise";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "L'adresse email est invalide";
    }
    if (!formData.password) {
      errors.password = "Le mot de passe est requis";
    } else if (formData.password.length < 8 || !/\d/.test(formData.password) || !/[A-Za-z]/.test(formData.password)) {
      errors.password = "Le mot de passe doit contenir au moins 8 caractères, dont des chiffres et des lettres";
    }
    if (!isLogin && formData.password !== formData.confirmPassword) {
      errors.confirmPassword = "Les mots de passe ne correspondent pas";
    }
    if (!isLogin && (!formData.firstName || !formData.lastName)) {
      errors.firstName = "Le nom est requis";
      errors.lastName = "Le prénom est requis";
    }
    return errors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setFormErrors(validateForm());
  };

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });
      const data = await response.json();
      if (data.success) {
        setSubmitStatus({ success: true, message: 'Connexion réussie !' });

        localStorage.setItem('user', JSON.stringify(data.user));
        console.log(localStorage.getItem('user'));

        navigate('/');
      } else {
        setSubmitStatus({ success: false, message: data.message });
      }
    } catch (err) {
      console.error(err);
      setSubmitStatus({ success: false, message: 'Erreur lors de la connexion' });
    }
  };

  const handleRegister = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          mdp: formData.password,
          nom: formData.firstName,
          prenom: formData.lastName,
        }),
      });
      const data = await response.json();
      if (data.success) {
        setSubmitStatus({ success: true, message: 'Inscription réussie !' });
        // Ici, gérer la navigation ou les actions post-inscription
      } else {
        setSubmitStatus({ success: false, message: data.message });
      }
    } catch (err) {
      console.error(err);
      setSubmitStatus({ success: false, message: "Erreur lors de l'inscription" });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm();
    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      if (isLogin) {
        await handleLogin();
      } else {
        await handleRegister();
      }
    }
  };

  const isFormValid = () => {
    return (
      formData.email &&
      /\S+@\S+\.\S+/.test(formData.email) &&
      formData.password &&
      (isLogin || (formData.password === formData.confirmPassword && formData.password.length >= 8))
    );
  };

  return (
    <Container component="main" maxWidth="xs" sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Typography component="h1" variant="h5" sx={{ mt: 2 }}>
        {isLogin ? 'Se connecter' : "S'inscrire"}
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          {!isLogin && (
            <>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="fname"
                  name="firstName"
                  variant="outlined"
                  required
                  fullWidth
                  id="firstName"
                  label="Nom"
                  autoFocus
                  value={formData.firstName}
                  onChange={handleChange}
                  error={!!formErrors.firstName}
                  helperText={formErrors.firstName}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="lastName"
                  label="Prénom"
                  name="lastName"
                  autoComplete="lname"
                  value={formData.lastName}
                  onChange={handleChange}
                  error={!!formErrors.lastName}
                  helperText={formErrors.lastName}
                />
              </Grid>
            </>
          )}
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              id="email"
              label="Adresse Email"
              name="email"
              autoComplete="email"
              value={formData.email}
              onChange={handleChange}
              error={!!formErrors.email}
              helperText={formErrors.email}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              name="password"
              label="Mot de passe"
              type="password"
              id="password"
              autoComplete="current-password"
              value={formData.password}
              onChange={handleChange}
              error={!!formErrors.password}
              helperText={formErrors.password}
            />
          </Grid>
          {!isLogin && (
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="confirmPassword"
                label="Confirmer le mot de passe"
                type="password"
                id="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                error={!!formErrors.confirmPassword}
                helperText={formErrors.confirmPassword}
              />
            </Grid>
          )}
        </Grid>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          sx={{ mt: 3, mb: 2 }}
          disabled={!isFormValid()}
        >
          {isLogin ? 'Se connecter' : "S'inscrire"}
        </Button>
        <Grid container justifyContent="flex-end">
          <Grid item>
            <Button onClick={() => setIsLogin(!isLogin)} sx={{ textTransform: 'none' }}>
              {isLogin ? "Pas de compte ? S'inscrire" : 'Déjà un compte ? Se connecter'}
            </Button>
          </Grid>
        </Grid>
        <Typography variant="caption" display="block" align="center" sx={{ mt: 2 }}>
        </Typography>
      </form>
          {/* Afficher un message de statut après la soumission */}
          {submitStatus.message && (
        <Alert severity={submitStatus.success ? 'success' : 'error'}>
          {submitStatus.message}
        </Alert>
      )}
    </Container>
  );
}

export default AuthForm;
