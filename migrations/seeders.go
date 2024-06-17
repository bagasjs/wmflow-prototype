package migrations

import (
	"github.com/bagasjs/balance/app"
	"github.com/bagasjs/balance/app/models"
	"github.com/bagasjs/balance/app/resources"
)

func seed(app *app.State) {
    app.AccountRepository.Insert(resources.CreateAccountRequest{
        Name: "Cash",
        Balance: 0,
        NormalPosition: models.AccountPosDebit,
        CurrentPosition: models.AccountPosDebit,
        Type: models.AccountTypeAsset,
        ParentID: 0,
    })
    app.AccountRepository.Insert(resources.CreateAccountRequest{
        Name: "Receivables",
        Balance: 0,
        NormalPosition: models.AccountPosDebit,
        CurrentPosition: models.AccountPosDebit,
        Type: models.AccountTypeAsset,
        ParentID: 0,
    })
    app.AccountRepository.Insert(resources.CreateAccountRequest{
        Name: "Inventories",
        Balance: 0,
        NormalPosition: models.AccountPosDebit,
        CurrentPosition: models.AccountPosDebit,
        Type: models.AccountTypeAsset,
        ParentID: 0,
    })
    app.AccountRepository.Insert(resources.CreateAccountRequest{
        Name: "Equipments",
        Balance: 0,
        NormalPosition: models.AccountPosDebit,
        CurrentPosition: models.AccountPosDebit,
        Type: models.AccountTypeAsset,
        ParentID: 0,
    })
    app.AccountRepository.Insert(resources.CreateAccountRequest{
        Name: "Payables",
        Balance: 0,
        NormalPosition: models.AccountPosCredit,
        CurrentPosition: models.AccountPosCredit,
        Type: models.AccountTypeLiability,
        ParentID: 0,
    })
    app.AccountRepository.Insert(resources.CreateAccountRequest{
        Name: "Common Stock",
        Balance: 0,
        NormalPosition: models.AccountPosCredit,
        CurrentPosition: models.AccountPosCredit,
        Type: models.AccountTypeEquity,
        ParentID: 0,
    })
    app.AccountRepository.Insert(resources.CreateAccountRequest{
        Name: "Retained Earnings",
        Balance: 0,
        NormalPosition: models.AccountPosCredit,
        CurrentPosition: models.AccountPosCredit,
        Type: models.AccountTypeEquity,
        ParentID: 0,
    })
    app.AccountRepository.Insert(resources.CreateAccountRequest{
        Name: "Sales Revenue",
        Balance: 0,
        NormalPosition: models.AccountPosCredit,
        CurrentPosition: models.AccountPosCredit,
        Type: models.AccountTypeRevenue,
        ParentID: 0,
    })
    app.AccountRepository.Insert(resources.CreateAccountRequest{
        Name: "Cost Of Goods Sold",
        Balance: 0,
        NormalPosition: models.AccountPosCredit,
        CurrentPosition: models.AccountPosCredit,
        Type: models.AccountTypeExpense,
        ParentID: 0,
    })
}
