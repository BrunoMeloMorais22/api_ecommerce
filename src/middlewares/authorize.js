

module.exports = (rolePermitida) => {
    return (req, res, next) => {
        if(req.user.role !== rolePermitida){
            return res.status(403).json({
                success: false,
                error: "Acesso negado"
            })
        }

        next()
    }
}