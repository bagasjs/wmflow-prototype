package resources

type CreateAccountRequest struct {
	Name            string `form:"name" json:"name"`
	Balance         uint64 `form:"balance" json:"balance"`
	NormalPosition  string `form:"normal_position" json:"normal_position"`
	CurrentPosition string `form:"current_position" json:"current_position"`
	Type            string `form:"type" json:"type"`
	ParentID        uint   `form:"parent_id" json:"parent_id"`
}

type SimpleAccountResponse struct {
	ID              uint   `json:"id"`
	Name            string `json:"name"`
	Balance         uint64 `json:"balance"`
	NormalPosition  string `json:"normal_position"`
	CurrentPosition string `json:"current_position"`
	Type            string `json:"type"`
	ParentID        uint   `json:"parent_id"`
}

