import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { get } from '../utils/api';
import { ContactLog } from '../utils/types';
import { formatDate } from '../utils/date';

// Interface for a table column object
interface TableColumn {
    id: string;
    label: string;
}

const columns: TableColumn[] = [
    { id: 'contacted', label: 'Contacted' },
    { id: 'minister', label: 'Minister' },
    { id: 'method', label: 'Method' },
    { id: 'flag', label: 'Flagged' },
    { id: 'note', label: 'Note' },
];

interface ContactLogProps {
    memberId: number;
}

const ContactLogs:  React.FC<ContactLogProps> = ({ memberId }) => {
    const [contactLog, setContactLog] = useState<ContactLog[]>([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await get(`/members/contact-log/${memberId}`);
                console.log({response})
                setContactLog(response);
            } catch (error) {
                console.log({error})
                setContactLog([]);
            }
        };

        fetchData();
    }, [memberId]);
    
    return (
        <TableContainer component={Paper} sx={{ maxHeight: 400, overflowY: 'auto' }}>
            <Table stickyHeader aria-label="sticky table">
                <TableHead>
                    <TableRow>
                        {columns.map((column) => (
                            <TableCell key={column.id}>
                                {column.label}
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {contactLog && contactLog.map((row) => (
                        <TableRow key={row.id}>
                            <TableCell>
                               { formatDate(row.created_at) }
                            </TableCell>
                            <TableCell>
                                {row.minister.firstName} {row.minister.lastName}
                            </TableCell>
                            <TableCell>
                                {row.contactMethod}
                            </TableCell>
                            <TableCell>
                                {row.flagged ? "YES" : ""}
                            </TableCell>
                            <TableCell>
                                {row.note}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default ContactLogs;
