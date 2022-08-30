import React from 'react'
import SaveButton from '../buttons/SaveButton'
import DeleteButton from '../buttons/DeleteButton'
import AddButton from '../buttons/AddButton'

const TableFooter = (props) => {
  return (
    <tfoot>
        <tr>
            <td colSpan="7" align="left">
                <AddButton>Add</AddButton>
                <SaveButton>Save</SaveButton>
                <DeleteButton>Delete</DeleteButton>
            </td>
        </tr>
    </tfoot>
  )
}

export default TableFooter;