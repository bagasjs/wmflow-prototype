package app

import (
	"log"

	"github.com/bagasjs/balance/app/repository"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

type AppConfig struct {
    SQLite3Path string
}

type State struct {
    DB *gorm.DB

    AccountRepository *repository.AccountRepository
    TransactionRepository *repository.TransactionRepository
}

func New(config AppConfig) *State {
    state := &State{}
    db, err := gorm.Open(sqlite.Open(config.SQLite3Path), &gorm.Config{})
    if err != nil {
        log.Fatal("Failed to create application: ", err)
    }
    state.DB = db
    state.AccountRepository = repository.NewAccountRepository(state.DB)
    state.TransactionRepository = repository.NewTransactionRepository(state.DB)
    return state
}
