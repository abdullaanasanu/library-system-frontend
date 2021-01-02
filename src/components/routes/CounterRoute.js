import { Fragment, useState } from "react";
import {Tooltip, Button} from "antd";
import { LikeOutlined } from '@ant-design/icons';

export default function CounterRoute() {

    const [ like, addLike ] = useState(5);

    return(
        <Fragment>
            <h1>Counter</h1>
            <h3>Current Like: {like} 
                <Tooltip title="like" >
                    <Button 
                        type="primary" 
                        shape="circle" 
                        icon={<LikeOutlined />} 
                        style={{ marginLeft: '10px'}} 
                        onClick={() => addLike(like + 1)}
                    />
                </Tooltip>
            </h3>
            
        </Fragment>
    )
}