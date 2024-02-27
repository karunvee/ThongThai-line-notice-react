import React, { useState } from 'react';

import AddMessage from './AddDialog/AddMessage';

function Messages() {
    return ( 
        <div className='Messages'>
            <AddMessage/>
        </div>
     );
}

export default Messages;