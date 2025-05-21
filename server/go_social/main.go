package main

import (
	"database/sql"
	"encoding/json"
	"log"
	"net/http"
	"strconv"
	"time"

	_ "modernc.org/sqlite"
)

// User representa a estrutura de dados para um usuário.
type User struct {
	ID            int       `json:"id"`
	Username      string    `json:"username"`
	Email         *string   `json:"email"`
	Senha         string    `json:"senha"`
	NomeCompleto  *string   `json:"nome_completo"`
	Bio           *string   `json:"bio"`
	FotoPerfilURL *string   `json:"foto_perfil_url"`
	DataCriacao   time.Time `json:"data_criacao"`
}

func main() {
	db, err := sql.Open("sqlite", "../rede_social.db")
	if err != nil {
		log.Fatal(err)
	}
	defer db.Close()

	// Cria a tabela "users" se não existir.
	// _, err = db.Exec(`
	// 	CREATE TABLE IF NOT EXISTS users (
	// 		id INTEGER PRIMARY KEY AUTOINCREMENT,
	// 		username TEXT,
	// 		email TEXT,
	// 		nome_completo TEXT,
	// 		bio TEXT,
	// 		foto_perfil_url TEXT
	// 	)
	// `)
	if err != nil {
		log.Fatal(err)
	}

	http.HandleFunc("/users", func(w http.ResponseWriter, r *http.Request) {
		switch r.Method {
		case http.MethodGet:
			getUsers(w, r, db)
		case http.MethodPost:
			createUser(w, r, db)
		default:
			http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		}
	})

	http.HandleFunc("/users/", func(w http.ResponseWriter, r *http.Request) {
		switch r.Method {
		case http.MethodGet:
			getUser(w, r, db)
		case http.MethodPut:
			updateUser(w, r, db)
		case http.MethodDelete:
			deleteUser(w, r, db)
		default:
			http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		}
	})

	log.Fatal(http.ListenAndServe(":8080", JSONContentTypeMiddleware(http.DefaultServeMux)))
}

func JSONContentTypeMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		// Header para permitir qualquer origem (ou especifique: "http://localhost:3000" por exemplo)
		w.Header().Set("Access-Control-Allow-Origin", "*")
		// Métodos permitidos
		w.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
		// Cabeçalhos permitidos
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

		// Se for preflight OPTIONS, responde sem continuar
		if r.Method == http.MethodOptions {
			w.WriteHeader(http.StatusOK)
			return
		}

		// Resposta JSON por padrão
		w.Header().Set("Content-Type", "application/json")
		next.ServeHTTP(w, r)
	})
}

func getUsers(w http.ResponseWriter, r *http.Request, db *sql.DB) {
	rows, err := db.Query("SELECT id, username, email, nome_completo, bio, foto_perfil_url FROM users")
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	defer rows.Close()

	var users []User
	for rows.Next() {
		var user User
		err := rows.Scan(&user.ID, &user.Username, &user.Email, &user.NomeCompleto, &user.Bio, &user.FotoPerfilURL)
		//err := rows.Scan(&user.Username)

		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
		users = append(users, user)
	}

	response, err := json.Marshal(users)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusOK)
	w.Write(response)
}

func getUser(w http.ResponseWriter, r *http.Request, db *sql.DB) {
	idStr := r.URL.Path[len("/users/"):]
	id, err := strconv.Atoi(idStr)
	if err != nil {
		http.Error(w, "Invalid user ID", http.StatusBadRequest)
		return
	}

	var user User
	err = db.QueryRow("SELECT id, username, email, nome_completo, bio, foto_perfil_url FROM users WHERE id = ?", id).Scan(
		&user.ID, &user.Username, &user.Email, &user.NomeCompleto, &user.Bio, &user.FotoPerfilURL,
	)
	if err != nil {
		http.Error(w, "User not found", http.StatusNotFound)
		return
	}

	response, err := json.Marshal(user)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusOK)
	w.Write(response)
}

func createUser(w http.ResponseWriter, r *http.Request, db *sql.DB) {
	var user User
	err := json.NewDecoder(r.Body).Decode(&user)
	if err != nil {
		log.Println("Erro ao decodificar JSON:", err)
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}

	result, err := db.Exec(`
		INSERT INTO users (username, email, senha, nome_completo, bio, foto_perfil_url)
		VALUES (?, ?, ?, ?, ?, ?)`,
		user.Username, user.Email, user.Senha, user.NomeCompleto, user.Bio, user.FotoPerfilURL,
	)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	lastInsertID, err := result.LastInsertId()
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	user.ID = int(lastInsertID)

	response, err := json.Marshal(user)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusCreated)
	w.Write(response)
}

func updateUser(w http.ResponseWriter, r *http.Request, db *sql.DB) {
	idStr := r.URL.Path[len("/users/"):]
	id, err := strconv.Atoi(idStr)
	if err != nil {
		http.Error(w, "Invalid user ID", http.StatusBadRequest)
		return
	}

	var user User
	err = json.NewDecoder(r.Body).Decode(&user)
	if err != nil {
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}

	_, err = db.Exec(`
		UPDATE users SET username=?, email=?, nome_completo=?, bio=?, foto_perfil_url=?
		WHERE id=?`,
		user.Username, user.Email, user.NomeCompleto, user.Bio, user.FotoPerfilURL, id,
	)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusOK)
}

func deleteUser(w http.ResponseWriter, r *http.Request, db *sql.DB) {
	idStr := r.URL.Path[len("/users/"):]
	id, err := strconv.Atoi(idStr)
	if err != nil {
		http.Error(w, "Invalid user ID", http.StatusBadRequest)
		return
	}

	_, err = db.Exec("DELETE FROM users WHERE id=?", id)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusOK)
}
