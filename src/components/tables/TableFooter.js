import React from 'react'
import EditButton from '../buttons/EditButton'
import DeleteButton from '../buttons/DeleteButton'
import AddButton from '../buttons/AddButton'

const TableFooter = () => {
  return (
    <tfoot>
        <tr>
            <td colSpan="7" align="left">
                <AddButton>Add</AddButton>
                <EditButton>Save</EditButton>
                <DeleteButton>Delete</DeleteButton>
            </td>
        </tr>
    </tfoot>
  )
}

export default TableFooter;