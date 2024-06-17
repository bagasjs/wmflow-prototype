package repository

import (
	"github.com/bagasjs/balance/app/models"
	"github.com/bagasjs/balance/app/resources"
	"gorm.io/gorm"
)

type AccountRepository struct {
    db *gorm.DB
}

func NewAccountRepository(db *gorm.DB) *AccountRepository {
    return &AccountRepository{ db, }
}

func (repo *AccountRepository) All() ([]resources.SimpleAccountResponse, error) {
    data := []resources.SimpleAccountResponse{}
    res := repo.db.Model(&models.Account{}).Find(&data)
    if res.Error != nil {
        return nil, res.Error
    }
    return data, nil
}

func (repo *AccountRepository) Find(id uint) (models.Account, error) {
    data := models.Account{}
    if err := repo.db.Model(&models.Account{}).Preload("Entries").First(&data, "id = ?", id).Error; err != nil {
        return data, err
    }
    return data, nil
}

func (repo *AccountRepository) FindByName(name string) (resources.SimpleAccountResponse, error) {
    data := resources.SimpleAccountResponse{}
    res := repo.db.Model(&models.Account{}).First(&data, "name = ?", name)
    if res.Error != nil {
        return data, res.Error
    }
    return data, nil
}

func (repo *AccountRepository) Insert(createAccount resources.CreateAccountRequest) error {
    account := models.Account{}
    account.Name = createAccount.Name
    account.CurrentPosition = createAccount.CurrentPosition
    account.NormalPosition = createAccount.NormalPosition
    account.Balance = createAccount.Balance
    account.Type = createAccount.Type
    account.ParentID = createAccount.ParentID
    repo.db.Create(&account)
    return nil
}

func (repo *AccountRepository) GetDetail(id uint) models.Account {
    return models.Account{}
}

func (repo *AccountRepository) GetDetailByName(name string) models.Account{
    return models.Account{}
}

