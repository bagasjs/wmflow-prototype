package controllers

import (
	"github.com/bagasjs/balance/app"
	"github.com/bagasjs/balance/app/models"
	"github.com/bagasjs/balance/app/resources"
	"github.com/gofiber/fiber/v2"
)

type APIAccountController struct {
    app *app.State
}

func (controller *APIAccountController) index(c *fiber.Ctx) error {
    accounts, err := controller.app.AccountRepository.All()
    if err != nil {
        return c.JSON(fiber.Map{
            "error": true,
            "message": err.Error(),
            "data": nil,
        })
    }
    return c.JSON(fiber.Map{
        "error": false,
        "message": "All accounts retrieved",
        "data": accounts,
    })
}

func (controller *APIAccountController) search(c *fiber.Ctx) error {
    query := c.Queries()
    account := resources.SimpleAccountResponse{}
    res := controller.app.DB.Model(&models.Account{}).Where(query).First(&account)
    if res.Error != nil {
        return c.JSON(fiber.Map{
            "error": true,
            "message": res.Error.Error(),
            "data": "Search",
        })
    }

    return c.JSON(fiber.Map{
        "error": false,
        "message": "Account is found",
        "data": account,
    })
}

func (controller *APIAccountController) show(c *fiber.Ctx) error {
    id, err := c.ParamsInt("id")
    if err != nil {
        return c.JSON(fiber.Map{
            "error": true,
            "message": err.Error(),
            "data": nil,
        })
    }

    account, err := controller.app.AccountRepository.Find(uint(id))
    if err != nil {
        return c.JSON(fiber.Map{
            "error": true,
            "message": err.Error(),
            "data": nil,
        })
    }

    return c.JSON(fiber.Map{
        "error": false,
        "message": "Account is found",
        "data": account,
    })
}

func (controller *APIAccountController) store(c *fiber.Ctx) error {
    createAccount := resources.CreateAccountRequest{}
    if err := c.BodyParser(&createAccount); err != nil {
        return c.JSON(fiber.Map{
            "error": true,
            "message": err.Error(),
            "data": nil,
        })
    }

    controller.app.AccountRepository.Insert(createAccount)
    return c.JSON(fiber.Map{
        "error": false,
        "message": "Account creation success",
        "data": createAccount,
    })
}

func (controller *APIAccountController) Group(router fiber.Router) {
    router.Get("/", controller.index)
    router.Get("/search", controller.search)
    router.Get("/:id", controller.show)
    router.Post("/", controller.store)
}

func NewAPIAccountController(app *app.State) Controller {
    return &APIAccountController{ app, }
}
