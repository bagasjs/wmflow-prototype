package main

import (
	"fmt"
	"log"
	"os"

	"github.com/bagasjs/balance/app"
	"github.com/bagasjs/balance/http"
	"github.com/bagasjs/balance/migrations"
	"github.com/joho/godotenv"
)

func ShiftArgs(args []string, onEmptyErrorMessage string) (string, []string) {
    if len(args) == 0 {
        log.Fatal("ERROR: ", onEmptyErrorMessage)
    }
    return args[0], args[1:]
}

func main() {
    godotenv.Load()
    args := os.Args
    program, args := ShiftArgs(args, "Unreachable")
    subcommand, args := ShiftArgs(args, "Please provide a subcommand")

    config := app.AppConfig{
        SQLite3Path: "db.sqlite3",
    }
    app := app.New(config)

    switch subcommand {
    case "help":
        {
            fmt.Printf("USAGE: %s <SUBCOMMAND>", program)
            fmt.Print ("Available subcommands")
            fmt.Print ("    serve      Start an HTTP server")
            fmt.Print ("    migrate    Migrate database")
            fmt.Print ("    help       Help message")
        } 
        break
    case "serve":
        {
            http.Boot(app)
        } 
        break
    case "migrate":
        {
            migrations.Boot(app)
        }
        break
    default:
        {
            log.Fatal("ERROR: Unknown subcommand")
        }
        break
    }
}
