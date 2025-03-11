import React, { useEffect, useState } from 'react'

const BACKEND_URL = "http://localhost:4000";

function Admin() {

    const [productName, setProductName] = useState<string>("");
    const [productImage, setProductImage] = useState<File | null>(null);
    const [productDesc, setProductDesc] = useState<string>("");
    const [error , setError] = useState<string | null>(null);
    const [message , setMessage] = useState<string | null>(null);

    const [productPrice, setProductPrice] = useState<string>("");
    const [additionalInfo, setAdditionalInfo] = useState<{} | null>(null);

    const [category, setCategory] = useState<string>("select");



    useEffect(() => {

        function clearUi() {
             
            const timeoutid = setTimeout(() => {
                setError(null);
                setMessage(null);
            }, 2000);

            return () => clearTimeout(timeoutid);
        }

        clearUi();
          
    } , [error , message]);

    function handleFileSelect(e: React.ChangeEvent<HTMLInputElement>) {

        const file = e.target.files?.[0];
        if (file) {
            setProductImage(file);
            console.log(file);

        }
    }

    function handleSetPrice(e: React.ChangeEvent<HTMLInputElement>) {
        if (isNaN(Number(e.target.value))) return;

        setProductPrice(e.target.value);
    }

    function handleSetAdditional(e : React.ChangeEvent<HTMLInputElement>) {
        setAdditionalInfo({ ...additionalInfo , [e.target.name] : e.target.value });
    }

    function ChangeCategory(e : React.ChangeEvent<HTMLSelectElement>) { 
        setCategory(e.target.value)
        setAdditionalInfo({});
    }

    async function uploadProductInfo() {
          
        
        if(!checkandvalidateFields()) return;

        const formdata = new FormData();
        formdata.append("productName" , productName);
        formdata.append("productPrice" , productPrice);
        formdata.append("productCategory" , category);

        
         if(productDesc != "") formdata.append("productDesc" , productDesc);

        if(productImage)  formdata.append("file" , productImage);

        if(additionalInfo) formdata.append("AdditionalInfo"  , JSON.stringify(additionalInfo));

        const response = await fetch(`${BACKEND_URL}/product/add-newProduct` , {
             method : "POST",
             body : formdata
        });

        const result = await response.json();
        if(response.ok) {
             console.log(result.message);
        }

    }

    function checkandvalidateFields()   : boolean{

          if(productName == "" || productImage == null || productPrice == "" || category == "select") { 
            setError("fields can not be empty")
            return false; 
          }

          return true;
    }


    return (
        <div >

            <div>
                <p>Select Category </p>
                <select name="items" id="" value={category} onChange={ChangeCategory}>
                    <option value="select">select</option>
                    <option value="fashion">fashion</option>
                    <option value="electronic">electronic</option>
                    <option value="beauty">beauty</option>
                    <option value="grocery">grocery</option>
                    <option value="wellness">wellness</option>
                    <option value="footwear">footwear</option>
                </select>
                <p>{category}</p>
            </div>


            <div style={{ display: 'flex', flexDirection: "column", gap: "20px" }} >
                <h1>ADD NEW PRODUCT</h1>
                <label htmlFor="">
                    Product Name : <input type="text" name='productName' required value={productName} onChange={(e) => setProductName(e.target.value)} />
                </label>
                <label htmlFor="">
                    Product Image : <input type="file" name='productImage' required onChange={handleFileSelect} />
                </label>
                <label htmlFor="">
                    Product Price : <input type="text" name='productPrice' required value={productPrice} onChange={handleSetPrice} />
                </label>
                <label htmlFor="">
                    Product desc :  <input type="text" name='productDesc' required value={productDesc} onChange={(e) => setProductDesc(e.target.value)} />
                </label>
            </div>

            <div>
                <p>ADDITIONAL INFOMATION</p>

                {category == "electronic" &&

                    <div>

                        RAM : <input type="text" name='RAM' onChange={handleSetAdditional} />
                        color : <input type="text" name='COLOR' onChange={handleSetAdditional} />
                        storage : <input type="text" name='STORAGE'  onChange={handleSetAdditional}/>
                    </div>
                }

                {["fashion"  , "footwear"].includes(category)&&

                    <div>
                        size : <input type="text" name='SIZE' onChange={handleSetAdditional} />
                        color : <input type="text" name='COLOR' onChange={handleSetAdditional}/>
                    </div>
                }
 


                <button onClick={uploadProductInfo} > Add Product </button>
             <p style={{ color : "red" }} >{error} </p>
             <p style={{ color : "green" }} >{message} </p>


          
            </div>

           

        </div>
    )
}

export default Admin
