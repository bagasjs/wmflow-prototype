package migrations

import (
	"log"

	"github.com/bagasjs/balance/app"
	"github.com/bagasjs/balance/app/models"
	"gorm.io/gorm"
)

func Boot(app *app.State) {
    log.Print("Migrating the database")
    up(app.DB.Migrator())

    log.Print("Running seeders")
    seed(app)
}

func up(migrator gorm.Migrator) {
    migrator.CreateTable(&models.Account{})
    migrator.CreateTable(&models.Transaction{})
    migrator.CreateTable(&models.TransactionItem{})
}
