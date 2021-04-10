import axios from 'axios';

export default axios.create({
    baseURL: 'https://api.unsplash.com', 
    headers: {
        Authorization: 'Client-ID cSYX_5wva0fcgwTg2o3QaKRX1nTB37zaQx2kf0RYCUI'
    }
})