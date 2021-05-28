const router = require("express").Router();
const TenantController = require("../controllers/tenantController.js")

router.post('/', TenantController.addTenant)

router.get('/', TenantController.getTenant)

router.get('/:id', TenantController.getTenantId)

router.put('/:id', TenantController.putTenantId)

router.delete('/:id', TenantController.deleteTenantId)

module.exports = router