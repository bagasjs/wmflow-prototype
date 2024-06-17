package models

import "gorm.io/gorm"

const (
	AccountPosDebit  = "DEBIT"
	AccountPosCredit = "CREDIT"
)
const (
	AccountTypeAsset     = "ASSET"
	AccountTypeLiability = "LIABILITY"
	AccountTypeEquity    = "EQUITY"
	AccountTypeRevenue   = "REVENUE"
	AccountTypeExpense   = "EXPENSE"
)

type Account struct {
	gorm.Model
    Name            string `json:"name"`
	Balance         uint64 `json:"balance"`
	NormalPosition  string `json:"normal_position"`
	CurrentPosition string `json:"current_position"`
	Type            string `json:"type"`

    ParentID uint `json:"parent_id"`
    Parent   *Account `json:"parent" gorm:"foreignKey:ParentID"`

    Entries []TransactionItem `json:"entries" gorm:"foreignKey:AccountID"`
}
