import React, { useState } from 'react';

function MyComponent() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Count: {count}</p>
      <button className='btn btn-success' onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}

export default MyComponent;
