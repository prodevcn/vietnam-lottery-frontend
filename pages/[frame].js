import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

const Frame = props => {
  const router = useRouter()
  const { frame } = router.query;
  return (
    <div>
      <h1>Frame: { frame }</h1>
    </div>
  );
};

export default Frame;