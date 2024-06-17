package models

import "gorm.io/gorm"

type TransactionItem struct {
	gorm.Model

    Label       string `json:"label"`
    Description string `json:"description"`
	Position    string `json:"position"`
	Value       uint64 `json:"value"`

    AccountID     uint `json:"account_id"`
    TransactionID uint `json:"transaction_id"`
}

type Transaction struct {
	gorm.Model

    Label       string `json:"label"`
    Description string `json:"description"`
    Items       []TransactionItem `json:"items" gorm:"foreignKey:TransactionID"`
}
