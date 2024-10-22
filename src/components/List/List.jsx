import "./List.scss";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";

const List = ({ columns, rows }) => {
  return (
    <div className="productList" >
      <DataGrid
        sx={{
          flex: 1,
          height: "650px",
          width:"700px"
        }}
        className="dataGrid"
        rows={rows}
        getRowId={(row) => row.id}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
        pageSizeOptions={[10]}
        disableRowSelectionOnClick
        checkboxSelection
      />
      
    </div>
  );
};

export default List;
