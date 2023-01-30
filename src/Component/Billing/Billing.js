import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import NavigationBar from '../Home/NavigationBar';
import Container from '@mui/material/Container';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import SearchIcon from '@mui/icons-material/Search';
import Button from '@mui/material/Button';
import AddCardIcon from '@mui/icons-material/AddCard';
import AddNewBillingModal from './AddNewBilling/AddNewBillingModal';
import UpdateBilling from './UpdateBilling/UpdateBilling';
import useAuth from '../Sheard/Firebase/useAuth';


const Billing = () => {
    const [allBill,setAllBill] = useState([]);
    const [page,setPage] = useState(0);
    const [pageCount,setPageCount] = useState(0);
    const [totalPaid,setTotalPaid] = useState(0);
    const size = 10;
    const {users} = useAuth();

    //new bill added modal
    const [openNewBill, setOpenNewBuill] = useState(false);
    const handleNewBillOpen = () => setOpenNewBuill(true);
    const handleNewBillClose = () => setOpenNewBuill(false);

    //update bill start here modal
    const [openUpdate, setOpenUpdate] = useState(false);
    const handleUpdateOpen = () => setOpenUpdate(true);
    const handleUpdateClose = () => setOpenUpdate(false);
    const [update,setUpdate]= useState({});
    const updateModalOpen = e =>{
        setUpdate(e)
        handleUpdateOpen()
    }


    //searched data filtration
    const onhandleBlur = e =>{
        const searched = e.target.value.trimStart();
        fetch(`https://powerhack.investmentinsights360.com/api/billing-list/${searched}`)
        .then(res => res.json())
        .then(data => setAllBill(data))
    }


    //load bill info and added pagination
    useEffect(()=>{
        fetch(`https://powerhack.investmentinsights360.com/api/billing-list?page=${page}&&size=${size}`)
        .then(res=> res.json())
        .then(data =>{
            setAllBill(data.bill);
            const count = data.count;
            const pageCount = Math.ceil(count/size);
            setPageCount(pageCount);
        })
        getTotal()
    },[openNewBill,openUpdate,page])


    //total paid amount calculation 
    const getTotal = e =>{
        fetch("https://powerhack.investmentinsights360.com/api/billing")
        .then(res => res.json())
        .then(data=>setTotalPaid(data.total))
    }


// delete data from database
  const deleteBill = id =>{
    const proceed = window.confirm("Are you sure, you want to delete this Bill?")
    if(proceed){
        const url = `https://powerhack.investmentinsights360.com/api/delete-billing/${id}`;
        fetch(url,{
            method:"DELETE"
        })
        .then(res => res.json())
        .then(data =>{
            if(data.deletedCount>0){
                alert("Delete Successfully")
                const remainingUser = allBill.filter(theme=> theme._id !== id) 
                setAllBill(remainingUser); 
            }
            getTotal()
        }) 
    }
} 

return (
        <Box>
            {/* Navigation bar added here  */}
            <Box>
                <NavigationBar></NavigationBar>
            </Box>
           {
            users?.email &&<Container>
            <Box sx={{my:2,bgcolor:"#696969",color:"#fff",display:"flex",padding:"10px",alignItems:'center',justifyContent:"space-between"}}>
            <Box sx={{display:"flex",alignItems:'center'}}>
                <Typography sx={{mr:2}} variant="h6" gutterBottom>
                 Billings
                </Typography>
                    <input onBlur={onhandleBlur} style={{width:"200px",padding:"5px",borderRadius:'10px'}} type="search"></input>
                    <SearchIcon sx={{cursor:"pointer"}}/>
                </Box>
                <Typography sx={{mr:2}} variant="h6" gutterBottom>
                 Total Paid: {totalPaid}
                </Typography>
                <Button 
                 onClick={handleNewBillOpen}
                style={
                    {
                        background:"black",
                        fontSize: "16px",
                        fontWeight:"600",
                        padding: "8px 10px",
                        width:"auto",
                        boxShadow: 0,
                        color:"#fff"
                        }
                    }
                variant="contained">  Add New  <AddCardIcon sx={{ml:1}}/></Button>
            </Box>
            <Box>

            {/* Data load on table */}
            <TableContainer style={{overflowX:"visible"}} component={Paper}>
                <Table sx={{ width: "100%" }} aria-label="simple table">
                    <TableHead style={{position:"sticky",top:0,background:"#696969"}}>
                    <TableRow sx={{}}>
                            <TableCell sx={{padding:"10px",color:"#fff",fontSize:"18px",fontWeight:"500"}}>Bulling ID</TableCell>
                            <TableCell sx={{padding:"10px",color:"#fff",fontSize:"18px",fontWeight:"500"}}>Full Name</TableCell>
                            <TableCell sx={{padding:"10px",color:"#fff",fontSize:"18px",fontWeight:"500"}}>Email</TableCell>
                            <TableCell sx={{padding:"10px",color:"#fff",fontSize:"18px",fontWeight:"500"}}>Phone</TableCell>
                            <TableCell sx={{padding:"10px",color:"#fff",fontSize:"18px",fontWeight:"500"}}>Paid Amount</TableCell>
                            <TableCell sx={{padding:"10px",color:"#fff",fontSize:"18px",fontWeight:"500"}}>
                            Update || Delete</TableCell>
                            
                        </TableRow>
                    </TableHead>

                    {/* data map here */}
                    <TableBody>
                        {
                            allBill.map(bill=><TableRow
                                style={{color:"red"}}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                key={bill._id}
                                >
                                
                                <TableCell sx={{padding:"10px"}} align="left">
                                    {bill._id}
                                </TableCell>
                                <TableCell sx={{padding:"10px"}} align="left">{bill.name}</TableCell>
                                <TableCell sx={{padding:"10px"}} align="left">{bill.email}</TableCell>
                                <TableCell sx={{padding:"10px"}} align="left">{bill.phone}</TableCell>
                                <TableCell sx={{padding:"10px"}} align="left">{bill.paidAmount}</TableCell>
                                <TableCell sx={{padding:"10px",color:"#357EDD",cursor:"pointer"}} align="left">
                                    <Button onClick={()=>updateModalOpen(bill)} variant="text">Update</Button> ||
                                    <Button onClick={()=>deleteBill(bill._id)} variant="text">Delete</Button>
                                </TableCell>
                                <Box>

                                    {/* update billing info modal  */}
                                    <UpdateBilling
                                        openUpdateBillingModal={openUpdate}
                                        closeBillingUpdateModal={handleUpdateClose}
                                        bill={update} 
                                        type="bangladesh"
                                        >
                                    </UpdateBilling>
                                </Box>
                            </TableRow>)
                            
                        }
                    
                   
                    </TableBody>
                </Table>
            </TableContainer>
            </Box>
            <Box sx={{my:4}}>


                {/* pagination area*/}
                {
                    [...Array(pageCount).keys()].map(number=><button
                         key={number}
                         onClick={()=>setPage(number)}
                         style={{margin:"7px",cursor:"pointer",padding:"5px 15px",fontSize:"17px"}}>{number}</button>)
                }
            </Box>
            </Container>
           } 


           {/* new bill added modal*/}
            <Box>
                <AddNewBillingModal
                openNewBulling={openNewBill}
                handleNewBullingClose={handleNewBillClose}
                >
                </AddNewBillingModal>
            </Box>
        </Box>
    );
};

export default Billing;