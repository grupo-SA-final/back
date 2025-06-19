const { verifyToken } = require('../config/jwt');

const authMiddleware = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({ 
        success: false, 
        message: 'Token de autenticação não fornecido' 
      });
    }

    const decoded = verifyToken(token);
    
    if (!decoded) {
      return res.status(401).json({ 
        success: false, 
        message: 'Token inválido ou expirado' 
      });
    }

    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ 
      success: false, 
      message: 'Erro na autenticação' 
    });
  }
};

module.exports = authMiddleware; 