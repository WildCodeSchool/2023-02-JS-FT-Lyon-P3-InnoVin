import { Button, Dialog, DialogTitle, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import PropTypes from "prop-types";

export default function DeleteConfirmModal({
  confirmDelete,
  handleDeleteClick,
  handleDeleteModal,
  deletedElement,
}) {
  if (deletedElement[0])
    return (
      <Dialog open={confirmDelete} sx={{ maxWidth: "60vw", margin: "0 auto" }}>
        <DialogTitle
          sx={{ textAlign: "center" }}
        >{`Voulez-vous vraiment supprimer ${
          deletedElement[0].name
            ? deletedElement[0].name
            : `${deletedElement[0].firstname} ${deletedElement[0].lastname}`
        } ?`}</DialogTitle>
        <Typography sx={{ textAlign: "center", paddingInline: "10%" }}>
          Cela supprimera également toutes les données qui y sont associées
        </Typography>
        <Stack
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            gap: "20px",
            marginBlock: "20px",
          }}
        >
          <Button variant="contained" onClick={handleDeleteClick}>
            Oui
          </Button>
          <Button
            variant="outlined"
            sx={{ color: "white" }}
            onClick={handleDeleteModal}
          >
            Non
          </Button>
        </Stack>
      </Dialog>
    );
}

DeleteConfirmModal.propTypes = {
  confirmDelete: PropTypes.bool.isRequired,
  handleDeleteClick: PropTypes.func.isRequired,
  handleDeleteModal: PropTypes.func.isRequired,
  deletedElement: PropTypes.arrayOf(
    PropTypes.objectOf(
      PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    )
  ).isRequired,
};
