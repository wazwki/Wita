import React from 'react';
import { Card} from 'antd';

function Task() {


    return (
      <div>
    <Card
      title="Task"
      extra={<a href="#">More</a>}
      style={{
        width: 300,
      }}
    >
      <p>Task content</p>
      <p>Task content</p>
      <p>Task content</p>
    </Card>
      </div>
    )
  }
  
  export default Task