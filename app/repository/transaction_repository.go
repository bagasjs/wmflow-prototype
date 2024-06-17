package repository

import (
	"github.com/bagasjs/balance/app/models"
	"github.com/bagasjs/balance/app/resources"
	"gorm.io/gorm"
)

type TransactionRepository struct {
    db *gorm.DB
}

func NewTransactionRepository(db *gorm.DB) *TransactionRepository {
    return &TransactionRepository{ db, }
}

func (repo *TransactionRepository) All() ([]resources.SimpleTransactionResponse, error) {
    data := []resources.SimpleTransactionResponse{}
    res := repo.db.Model(&models.Transaction{}).Find(&data)
    if res.Error != nil {
        return nil, res.Error
    }
    return data, nil
}

func (repo *TransactionRepository) Insert(input resources.CreateTransactionRequest) error {
    transaction := models.Transaction{}
    transaction.Label = input.Label
    transaction.Description = input.Description
    transaction.Items = make([]models.TransactionItem, 0)
    for _, item := range input.Items {
        transaction.Items = append(transaction.Items, models.TransactionItem{
            Label: item.Label,
            Description: item.Description,
            Position: item.Position,
            Value: item.Value,
            AccountID: item.AccountID,
        })
    }
    res := repo.db.Create(&transaction)
    return res.Error
}

func (repo *TransactionRepository) Find(id uint) (models.Transaction, error) {
    data := models.Transaction{}
    if err := repo.db.Model(&models.Transaction{}).Preload("Items").First(&data, "id = ?", id).Error; err != nil {
        return data, err
    }
    return data, nil
}
