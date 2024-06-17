package controllers

import (
	"github.com/bagasjs/balance/app"
	"github.com/bagasjs/balance/app/models"
	"github.com/bagasjs/balance/app/resources"
	"github.com/gofiber/fiber/v2"
)

type APITransactionController struct {
    app *app.State
}

func (controller *APITransactionController) index(c *fiber.Ctx) error {
    data, err := controller.app.TransactionRepository.All()
    if err != nil {
        return c.JSON(fiber.Map{
            "error": true,
            "message": err.Error(),
            "data": nil,
        })
    }
    return c.JSON(fiber.Map{
        "error": false,
        "message": "All transaction retrieved",
        "data": data,
    })
}

func (controller *APITransactionController) show(c *fiber.Ctx) error {
    id, err := c.ParamsInt("id")
    if err != nil {
        return c.JSON(fiber.Map{
            "error": true,
            "message": err.Error(),
            "data": nil,
        })
    }

    data, err := controller.app.TransactionRepository.Find(uint(id))
    if err != nil {
        return c.JSON(fiber.Map{
            "error": true,
            "message": err.Error(),
            "data": nil,
        })
    }

    return c.JSON(fiber.Map{
        "error": false,
        "message": "All transaction retrieved",
        "data": data,
    })
}

func (controller *APITransactionController) store(c *fiber.Ctx) error {
    createTransaction := resources.CreateTransactionRequest{}
    if err := c.BodyParser(&createTransaction); err != nil {
        return c.JSON(fiber.Map{
            "error": true,
            "message": err.Error(),
            "data": nil,
        })
    }
    if err := controller.app.TransactionRepository.Insert(createTransaction); err != nil {
        return c.JSON(fiber.Map{
            "error": true,
            "message": err.Error(),
            "data": nil,
        })
    }
    return c.JSON(fiber.Map{
        "error": false,
        "message": "Transaction is created successfully",
        "data": createTransaction,
    })
}

func (controller *APITransactionController) items(c *fiber.Ctx) error {
    data := []resources.SimpleTransactionItemResponse{}
    res := controller.app.DB.Model(&models.TransactionItem{}).Find(&data)
    if res.Error != nil {
        return c.JSON(fiber.Map{
            "error": true,
            "message": "Failed to fetch all items",
            "data": nil,
        })
    }
    return c.JSON(fiber.Map{
        "error": false,
        "message": "Transaction is created successfully",
        "data": data,
    })
}

func (controller *APITransactionController) Group(router fiber.Router) {
    router.Get("/", controller.index)
    router.Get("/items", controller.items)
    router.Post("/", controller.store)
    router.Get("/:id", controller.show)
}

func NewAPITransactionController(app *app.State) Controller {
    return &APITransactionController{ app, }
}
