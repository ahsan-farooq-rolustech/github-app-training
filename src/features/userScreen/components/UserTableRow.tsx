import { makeStyles } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import classes from './UserTableRow.module.css'
import TableRow from '@mui/material/TableRow';


interface props{
  rowHeader:string;
  rowValue:string;
}



function UserTableRow({rowHeader,rowValue}:props) {

  return (
    <div className="TableRow">
      <div className='table-container'>
      <Table  className={classes.table} >      
          <TableRow  className={classes.rowStyle}>
              <TableCell variant="head" width={300}>{rowHeader}</TableCell>
              <TableCell width={100} >{rowValue}</TableCell>
          </TableRow>        
      </Table>
      </div>
    </div>
  );
}

export default UserTableRow;