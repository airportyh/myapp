import './styles.mjs';
import { authenticate } from './LoginPage.mjs';
import Navigator from './Navigator.mjs';

main().catch(console.error);

async function main() {
    await authenticate();
    
    const nav = new Navigator(document.body);
    nav.gotoNoteList();
}

