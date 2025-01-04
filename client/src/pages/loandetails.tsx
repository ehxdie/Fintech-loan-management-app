import React from 'react';
import { useParams } from 'react-router-dom';

const LoanDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>(); // Type annotation for route parameter
    return <div>Loan Details for ID: {id}</div>;
};

export default LoanDetails;
