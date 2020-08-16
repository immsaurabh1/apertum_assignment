import React, { useState, useEffect } from 'react'
import CardComponent from "../../Layout/CardComponent"
import Loader from "../../Base/LoaderComponent";
import { useCookies } from 'react-cookie';



export default function (props) {
    const [cookies, setCookie, removeCookie] = useCookies(['apertum-logged-in']);
    const [minAge20, setMinAge20] = useState(false);
    const [maxAge30, setMaxAge30] = useState(false);
    const [nameLengthFilter, setNameLengthFilter] = useState(false)
    const [loaderData, setLoaderData] = useState({
        showLoader: true,
        loaderMessage: "Loading User Data..."
    });
    useEffect(() => {

    }, [minAge20, maxAge30, nameLengthFilter])
    const [userList, setUserList] = useState([])
    const getUserList = async () => {
        fetch(
            "https://apertum-interview.herokuapp.com/api/users", {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${cookies['apertum-logged-in']}`
                }
            }
        )
            .then(res => {
                return res.json();
            })
            .then(
                result => {
                    if (result.length) {
                        setUserList(result)
                    }
                    setLoaderData({ showLoader: false, loaderMessage: "" });
                },
                error => {
                    setUserList([])
                    setLoaderData({ showLoader: false, loaderMessage: "" });
                    setTimeout(() => {
                        removeCookie('apertum-logged-in', { path: '/' })
                        props.history.push("/login")
                    })
                }
            )
    }
    useEffect(() => {
        getUserList()
    }, [])
    return <div style={{
        padding: "16px",
        textAlign: "center"
    }}>
        <Loader {...loaderData} />
        <h3 style={{ textAlign: "left", borderBottom: '1px solid #dcdcdc' }}>User List</h3>
        <div style={{ fontWeight: "500" }}>Apply Filters</div>
        <div style={{ padding: '16px' }} >
            <span onClick={() => setMinAge20(!minAge20)}><input checked={minAge20} type="checkbox" readOnly /> Age Greater than 20</span>
            <span onClick={() => setMaxAge30(!maxAge30)}><input checked={maxAge30} type="checkbox" readOnly /> Age Less than 30</span>
            <span onClick={() => setNameLengthFilter(!nameLengthFilter)}><input checked={nameLengthFilter} type="checkbox" readOnly /> Full name is more than 10 characters</span>
        </div>
        {userList.length ?
            userList.filter(item => {
                if (minAge20 && item.age < 20) {
                    return false;
                }
                if (maxAge30 && item.age > 30) {
                    return false;
                }
                if (nameLengthFilter && (item.firstName.length + item.lastName.length <= 10)) {
                    return false;
                }
                return true;
            }).map((item, index) => <CardComponent key={item.accountId} {...item} />)
            : loaderData.showLoader ? <div>User Data Loading</div> : <div>No Users Found</div>}
    </div>
}