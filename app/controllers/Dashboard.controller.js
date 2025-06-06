exports.renderDashboard = async (req, res) => {
    try {
        res.render('dashboard/index', {
            title: 'Admin Dashboard | Optimal Form Builder'
        });
    } catch (err) {
        res.status(404).json({
            status: 404,
            error: err.message
        });
    }
}