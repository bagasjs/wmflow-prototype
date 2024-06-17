package resources

import "time"

type CreateTransactionItemRequest struct {
	Label       string `form:"label" json:"label"`
	Description string `form:"description" json:"description"`
	Position    string `form:"position" json:"position"`
	Value       uint64 `form:"value" json:"value"`
	AccountID   uint   `form:"account_id" json:"account_id"`
}

type CreateTransactionRequest struct {
	Label       string `form:"label" json:"label"`
	Description string `form:"description" json:"description"`

	Items []CreateTransactionItemRequest `form:"items" json:"items"`
}

type SimpleTransactionItemResponse struct {
	ID            uint   `json:"id"`
	Label         string `json:"label"`
	Description   string `json:"description"`
	Position      string `json:"position"`
	Value         uint64 `json:"value"`
	AccountID     uint   `json:"account_id"`
	TransactionID uint   `json:"transaction_id"`
}

type SimpleTransactionResponse struct {
	ID          uint                            `json:"id"`
	Label       string                          `json:"label"`
	Description string                          `json:"description"`
	CreatedAt   time.Time                       `json:"created_at"`
	UpdatedAt   time.Time                       `json:"updated_at"`
}
