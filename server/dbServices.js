const mysql = require('mysql');
const dotenv = require('dotenv');
dotenv.config();
let instance = null;

const connection = mysql.createConnection({
    host: process.env.host,
    user: process.env.user,
    password: process.env.password,
    database: process.env.db,
    db_port : process.env.db_port,
});

connection.connect((err)=>{
    if(err){
        console.log(err.message);
    }
    else{
        console.log('Connected');
    }
})

class Dbservices{
    static createDbInstance(){
        return instance ? instance : new Dbservices();
    }

    // college
   async getAllData(){
        try{
            const response = await new Promise((resolve,reject)=>{
                const query = 'select * from collegeTable;';
                connection.query(query, (error,results)=>{
                    if(error) reject(new Error(error.message));
                    resolve(results);
                })
                
            });
            // console.log(response);
            return response;
        }catch(err){
            console.log(err);
        }
    }
    async insertData(name,addr,pin,branches,avgPack,rating,review){
        try{
            const insertId = await new Promise((resolve,reject)=>{
                const query = 'insert into collegeTable (c_name,c_addr,pincode,branches,avg_package,clg_rating,review) values (?,?,?,?,?,?,?);';
                connection.query(query, [name , addr,pin,branches,avgPack,rating,review],(error,result)=>{
                    if(error) reject(new Error(error.message));
                    resolve(result.insertId);
                })
                
            });
            // console.log(insertId);
             return {
                id : insertId,
                name: name,
                addr: addr,
                pin: pin,
                branches:branches,
                avgPack:avgPack,
                rating:rating,
                review:review
            };
        }catch(err){
            console.log(err);
        }
    }    

    // hostels
    async getAllHostelsData(){
        try{
            const response = await new Promise((resolve,reject)=>{
                const query = 'select * from hostelTable;';
                connection.query(query, (error,results)=>{
                    if(error) reject(new Error(error.message));
                    resolve(results);
                })
                
            });
            // console.log(response);
            return response;
        }catch(err){
            console.log(err);
        }
    }
    async insertHostelData(name,addr,pin,facilites,fees,rating,review){
        try{
            const insertId = await new Promise((resolve,reject)=>{
                const query = 'insert into hostelTable (h_name,h_addr,pincode,h_facilities,h_fees,h_rating,h_review) values (?,?,?,?,?,?,?);';
                connection.query(query, [name , addr,pin,facilites,fees,rating,review],(error,result)=>{
                    if(error) reject(new Error(error.message));
                    resolve(result.insertId);
                })
                
            });
            // console.log(insertId);
             return {
                id : insertId,
                name: name,
                addr: addr,
                pin: pin,
                facilites:facilites,
                fees:fees,
                rating:rating,
                review:review
            };
        }catch(err){
            console.log(err);
        }
    }  
    // mess
    async getAllMessData(){
        try{
            const response = await new Promise((resolve,reject)=>{
                const query = 'select * from messTable;';
                connection.query(query, (error,results)=>{
                    if(error) reject(new Error(error.message));
                    resolve(results);
                })
                
            });
            // console.log(response);
            return response;
        }catch(err){
            console.log(err);
        }
    }  
    async insertMessData(name,addr,pin,facilites,fees,rating,review){
        try{
            const insertId = await new Promise((resolve,reject)=>{
                const query = 'insert into messTable (m_name,m_addr,pincode,m_facilities,m_fees,m_rating,m_review) values (?,?,?,?,?,?,?);';
                connection.query(query, [name , addr,pin,facilites,fees,rating,review],(error,result)=>{
                    if(error) reject(new Error(error.message));
                    resolve(result.insertId);
                })
                
            });
            // console.log(insertId);
             return {
                id : insertId,
                name: name,
                addr: addr,
                pin: pin,
                facilites:facilites,
                fees:fees,
                rating:rating,
                review:review
            };
        }catch(err){
            console.log(err);
        }
    } 
    
    
    // search id
    async searchHostelsById(id){
        try{
            const response = await new Promise((resolve,reject)=>{
                const query = 'select * from hostelTable where pincode = (select pincode from collegeTable where c_id = ?);';
                connection.query(query, [id], (error,result)=>{
                    if(error) reject(new Error(error.message));
                    resolve(result);
                })
                
            });
            return response;

        }catch(err){
            console.log(err);
            return false;
        }
    }
    async searchMessById(id){
        try{
            const response = await new Promise((resolve,reject)=>{
                const query = 'select * from messTable where pincode = (select pincode from collegeTable where c_id = ?);';
                connection.query(query, [id], (error,result)=>{
                    if(error) reject(new Error(error.message));
                    resolve(result);
                })
                
            });
            return response;

        }catch(err){
            console.log(err);
            return false;
        }
    }

    // search college by name
    async searchCollegeByName(name){
        try{
            const response = await new Promise((resolve,reject)=>{
                const query = 'select * from collegeTable where c_name = ?;';
                connection.query(query, [name], (error,result)=>{
                    if(error) reject(new Error(error.message));
                    resolve(result);
                })
                
            });
            return response;

        }catch(err){
            console.log(err);
            return false;
        }
    }

    // comments
    async insertCommentData(name,email,comment){
        try{
            const insertId = await new Promise((resolve,reject)=>{
                const query = 'insert into comments (comment_name,comment_email,comment) values (?,?,?);';
                connection.query(query, [name , email,comment],(error,result)=>{
                    if(error) reject(new Error(error.message));
                    resolve(result.insertId);
                })
                
            });
            // console.log(insertId);
             return {
                id : insertId,
            };
        }catch(err){
            console.log(err);
        }
    }   
    // user registration
    async registerUser(name,pass){
        try{
            const insertId = await new Promise((resolve,reject)=>{
                const query = 'insert into user (u_name,u_pass) values (?,?);';
                connection.query(query, [name , pass],(error,result)=>{
                    if(error) reject(new Error(error.message));
                    resolve(result.insertId);
                })
                
            });
            // console.log(insertId);
             return insertId ? true : false;
        }catch(err){
            console.log(err);
        }
    }   
    async verifyUser(pass){
        try{
            const response = await new Promise((resolve,reject)=>{
                const query = 'select * from user where u_pass = ? ;';
                connection.query(query, [pass],(error,result)=>{
                    if(error) reject(new Error(error.message));
                    resolve(result);
                })
                
            });
            // console.log(response);
            return response;

        }catch(err){
            console.log(err);
        }
    }   
}


module.exports = Dbservices;