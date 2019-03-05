const router = express.Router();
const scrapeController = require('../controllers/scrapeController');

router.get('/', scrapeController);