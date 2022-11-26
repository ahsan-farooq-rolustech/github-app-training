import React from "react";
import { GridColDef } from "@mui/x-data-grid";
import { DataGrid } from "./../../../node_modules/@mui/x-data-grid/DataGrid/DataGrid";
import { UsersModel } from "../../models/UsersModel";
import classes from './UserTable.module.css'
import { SearchUsersModel, SearchUserModelItem } from '../../models/SearchUserModel';

interface Props {
  data:  SearchUsersModel|  Array<UsersModel> | null
}

/* Defining the columns of the table. */
const columns: GridColDef[] = [
  { field: "id", headerName: "id" },
  {
    field: "image",
    headerName: "image",
    type: "image",
    renderCell: (params) => (
      <img
        style={{
          objectFit: "fill",
          borderRadius: "100%",
          width: "50px",
          height: "50px",
        }}
        src={params.value}
        alt="user"
      />
    ),
    sortable: false,
    width: 300,
    filterable: false,
  },
  { field: "userName", headerName: "User Name", sortable: true, width: 300 },
  { field: "type", headerName: "Type", sortable: true, width: 300 },
];

const UserTable = ({ data }: Props) => {

  console.log(`${data instanceof Array<UsersModel>}`);

  const getTableData=()=>{
    if(data!==null)
    {
      if(data instanceof Array<UsersModel>)
      {
        return data.map((item: UsersModel, index: number) => ({
          id: index,
          image: item.avatar_url,
          userName: item.login,
          type: item.type,
            }))
      }
      else{
        return data.items.map((item:SearchUserModelItem,index:number)=>{
          return {
            id: index,
            image: item.avatar_url,
            userName: item.login,
            type: item.type,
          }
        })
      }
    }
    else
    {
      //* if the data is null then return an empty array
      return []
    }
  }

  return (
    
      <DataGrid
      rows={getTableData()}
        columns={columns}
        rowsPerPageOptions={[15]}
        pageSize={15}
      />
    
  );
};

export default UserTable;
