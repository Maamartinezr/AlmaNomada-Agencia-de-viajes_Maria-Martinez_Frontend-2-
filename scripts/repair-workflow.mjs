import {readFile,writeFile} from 'node:fs/promises';
const url=new URL('../.github/workflows/pages.yml',import.meta.url);
let text=await readFile(url,'utf8');
const cut=text.indexOf('    branches: [main]',text.indexOf('uses: actions/deploy-pages@v4'));
if(cut!==-1)text=text.slice(0,cut);
text=text.replace('      - run: pnpm build',`      - name: Verificar URL del backend
        env:
          API_URL: \${{ vars.VITE_API_URL }}
        run: |
          case "$API_URL" in
            https://*) echo "URL HTTPS configurada" ;;
            *) echo "Configure VITE_API_URL con el backend público HTTPS"; exit 1 ;;
          esac
      - run: pnpm build`);
await writeFile(url,text);
