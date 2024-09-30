const jwt = require('jsonwebtoken');


exports.verifyAdmin = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  

  if (!token) return res.status(401).json({ message: 'Access Denied. No token provided.' });

  try {
    
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Token payload:', verified); 

   
    if (!verified || !verified.isAdmin) {
      return res.status(403).json({ message: 'Access denied. Admin only.' });
    }
    
    req.user = verified; 
    next(); 
  } catch (error) {
    return res.status(400).json({ message: 'Invalid token' });
  }
};
