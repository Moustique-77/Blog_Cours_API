const express = require('express'); // import express
const app = express(); // create express app
const mariadb = require('mariadb'); // import mariadb
const cors = require('cors'); // import cors
const bcrypt = require('bcrypt');
require ('dotenv').config();

const pool = mariadb.createPool({ // create the pool
    host: process.env.DB_HOST,
    database: process.env.DB_DTB,
    user: process.env.DB_USER,
    password: process.env.DB_PWD,
    connectionLimit: 10
});

app.use(express.json()); // use the json middleware
app.use(cors()); // use cors middleware

// Route for user registration
app.post('/api/register', async (req, res) => {
    const conn = await pool.getConnection();

    try {
        let email = req.body.email;
        let password = req.body.mdp; 
        let nom = req.body.nom;
        let prenom = req.body.prenom;

        // Ensure that all required fields are provided
        if (!email || !password || !nom || !prenom) {
            return res.status(400).json({
                success: false,
                message: 'All fields (email, password, nom, prenom) are required'
            });
        }

        const hash = await bcrypt.hash(password, bcrypt.genSaltSync(10));

        console.log(hash);

        let rows = await conn.query("INSERT INTO Utilisateurs(email, mdp, nom, prenom) VALUES(?, ?, ?, ?)", [email, hash, nom, prenom]);

        console.log(rows);

        res.status(200).json(rows.affectedRows);
    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: 'Error during registration'
        });
    } finally {
        if (conn) {
            conn.release(); // Release the connection regardless of the outcome
        }
    }
});

app.post('/api/login', async (req, res) => {
    const conn = await pool.getConnection();
    
    try {
        let email = req.body.email;
        let password = req.body.password;

        const rows = await conn.query("SELECT * FROM Utilisateurs WHERE email = ?", [email]);

        if (rows.length === 1) {
            const storedPasswordHash = rows[0].mdp; // Récupération du hash du mot de passe depuis la base de données

            // Comparaison du mot de passe fourni avec le hash stocké
            const passwordMatch = await bcrypt.compare(password, storedPasswordHash);

            if (passwordMatch) {
                // Renvoi des données utilisateur sans inclure le hash du mot de passe
                const user = rows[0];
                res.json({
                    success: true,
                    message: 'User logged in successfully',
                    user: {
                        id: user.idUser,
                        email: user.email,
                        nom: user.nom,
                        prenom: user.prenom
                    }
                });
            } else {
                res.json({
                    success: false,
                    message: 'Incorrect password or email'
                });
            }
        } else {
            res.json({
                success: false,
                message: 'User does not exist'
            });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: 'Error during the login process'
        });
    } finally {
        if (conn) { 
            conn.release();
        }
    }
});


// ROUTE FOR CREATE A NEW ARTICLE
app.post('/api/articles', async (req, res) => {
    const conn = await pool.getConnection();

    try {
        let titre = req.body.titre;
        let contenu = req.body.contenu;
        let nom = req.body.userNom;

        console.log(req.body);

        // Ensure that all required fields are provided
        if (!titre || !contenu || !nom) {
            return res.status(400).json({
                success: false,
                message: 'All fields (titre, contenu, nom) are required'
            });
        }

        const result = await conn.query("INSERT INTO Articles(titre, contenu, auteur) VALUES(?, ?, ?)", [titre, contenu, nom]);


        if (result.affectedRows === 1) {
            res.status(201).json({
                success: true,
                message: 'Article created successfully'
            });
        } else {
            res.status(500).json({
                success: false,
                message: 'Error creating the article'
            });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: 'catch error creating the article'
        });
    } finally {
        if (conn) {
            conn.release(); // Release the connection regardless of the outcome
        }
    }
});


// ROUTE FOR GET ALL ARTICLES
app.get('/api/articles', async (req, res) => {
    const conn = await pool.getConnection();

    try {
        // Fetch specific columns for all articles from the database
        const articles = await conn.query("SELECT idArticle, titre, contenu, auteur, dateCreation FROM Articles");
        console.log(articles);
        // Send the articles as a JSON response
        res.status(200).json({
            success: true,
            articles: articles,
            message: 'All articles retrieved successfully'
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: 'Error fetching articles from the database'
        });
    } finally {
        if (conn) {
            conn.release(); // Release the connection regardless of the outcome
        }
    }
});

// GET ALL ARTICLES BY USER NAME
app.get('/api/articles/user/:userName', async (req, res) => {
    const conn = await pool.getConnection();

    try {
        const userName = req.params.userName;

        // Fetch all articles associated with the specified user name from the database
        const articles = await conn.query("SELECT * FROM Articles WHERE auteur = ?", [userName]);

        // Check if articles exist and send the response accordingly
        if (articles && articles.length > 0) {
            res.status(200).json({
                success: true,
                articles: articles,
                message: 'Articles retrieved successfully for the user'
            });
        } else {
            res.status(404).json({
                success: false,
                message: 'No articles found for the user'
            });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: 'Error fetching articles for the user from the database'
        });
    } finally {
        if (conn) {
            conn.release(); // Release the connection regardless of the outcome
        }
    }
});

// UPDATE AN ARTICLE
app.put('/api/articles/:articleId', async (req, res) => {
    const conn = await pool.getConnection();

    try {
        const articleId = req.params.articleId;
        const { titre, contenu } = req.body;

        // Check if required fields are provided
        if (!titre || !contenu) {
            return res.status(400).json({
                success: false,
                message: 'Title and content are required for the update'
            });
        }

        // Update the article in the database
        const result = await conn.query("UPDATE Articles SET titre = ?, contenu = ? WHERE idArticle = ?", [titre, contenu, articleId]);

        if (result.affectedRows === 1) {
            res.status(200).json({
                success: true,
                message: 'Article updated successfully'
            });
        } else {
            res.status(404).json({
                success: false,
                message: 'Article not found or no changes made'
            });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: 'Error updating the article'
        });
    } finally {
        if (conn) {
            conn.release(); // Release the connection regardless of the outcome
        }
    }
});





app.listen(3001, () => console.log('Server running on port 3001'));  // set the port to listen
