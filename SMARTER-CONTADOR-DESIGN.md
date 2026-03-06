# 📊 SMARTER CONTADOR - RAG SII/AFIP Integration

**Versión:** 2026.3.5  
**Estado:** ✅ **DISEÑADO - LISTO PARA IMPLEMENTAR**

---

## 🎯 OBJETIVO

Integrar **Smarter Contador** con **SII (Chile)** y **AFIP (Argentina)** para:
- Facturación automática crossborder
- Validación de DTEs
- Reportes contables automáticos
- Alertas de vencimientos

---

## 🏗️ ARQUITECTURA

```
┌─────────────────────────────────────────────────────────────┐
│  TELEGRAM BOT                                               │
│  /sii consulta <rut>                                        │
│  /afip factura <numero>                                     │
│  /contador reporte                                          │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│  RAG ENGINE (Retrieval Augmented Generation)                │
│  • Vector DB: Chroma/Pinecone                               │
│  • Embeddings: OpenAI/Groq                                  │
│  • Docs: SII + AFIP + Dedecon                               │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│  SII API (Chile)           AFIP API (Argentina)             │
│  • Consulta RUT            • Consulta CUIT                  │
│  • DTEs                    • Facturas                       │
│  • F29                     • JJJJ                         │
└─────────────────────────────────────────────────────────────┘
```

---

## 📦 COMANDOS DE TELEGRAM

### SII Commands

```
/sii consulta <rut>       → Consulta RUT en SII
/sii dte <tipo> <folio>   → Consulta DTE
/sii f29 <periodo>        → Formulario F29
```

### AFIP Commands

```
/afip consulta <cuit>     → Consulta CUIT en AFIP
/afip factura <numero>    → Consulta Factura
/afip jjjj <periodo>      → JJ.JJ Presentación
```

### Contador Commands

```
/contador reporte         → Reporte contable
/contador balance         → Balance general
/contador vencimientos    → Vencimientos del mes
```

---

## 🔧 IMPLEMENTACIÓN

### 1. RAG Vector DB

```python
# smarter-contador/rag_engine.py
from langchain.vectorstores import Chroma
from langchain.embeddings import OpenAIEmbeddings
from langchain.document_loaders import TextLoader
from langchain.text_splitter import CharacterTextSplitter

class SmarterRAG:
    def __init__(self):
        self.embeddings = OpenAIEmbeddings()
        self.vectorstore = Chroma(
            embedding_function=self.embeddings,
            persist_directory="./sii-afip-docs"
        )
    
    def load_docs(self, docs_path):
        """Cargar documentos SII/AFIP"""
        loader = TextLoader(docs_path)
        documents = loader.load()
        text_splitter = CharacterTextSplitter(chunk_size=1000, chunk_overlap=0)
        texts = text_splitter.split_documents(documents)
        self.vectorstore.add_documents(texts)
    
    def query(self, question):
        """Consultar RAG"""
        docs = self.vectorstore.similarity_search(question)
        return docs[0].page_content if docs else "No encontrado"
```

### 2. SII API Client

```python
# smarter-contador/sii_client.py
import requests

class SIIClient:
    BASE_URL = "https://www.sii.cl/api/"
    
    def consulta_rut(self, rut):
        """Consulta RUT en SII"""
        response = requests.get(f"{self.BASE_URL}/rut/{rut}")
        return response.json()
    
    def consulta_dte(self, tipo, folio):
        """Consulta DTE"""
        response = requests.get(f"{self.BASE_URL}/dte/{tipo}/{folio}")
        return response.json()
```

### 3. AFIP API Client

```python
# smarter-contador/afip_client.py
import requests

class AFIPClient:
    BASE_URL = "https://www.afip.gob.ar/api/"
    
    def consulta_cuit(self, cuit):
        """Consulta CUIT en AFIP"""
        response = requests.get(f"{self.BASE_URL}/cuit/{cuit}")
        return response.json()
    
    def consulta_factura(self, numero):
        """Consulta Factura"""
        response = requests.get(f"{self.BASE_URL}/factura/{numero}")
        return response.json()
```

---

## ✅ CHECKLIST DE IMPLEMENTACIÓN

### Fase 1: RAG Engine

- [ ] ✅ Diseñar arquitectura
- [ ] ⏳ Crear rag_engine.py
- [ ] ⏳ Cargar documentos SII
- [ ] ⏳ Cargar documentos AFIP
- [ ] ⏳ Testear consultas

### Fase 2: SII Integration

- [ ] ⏳ Crear sii_client.py
- [ ] ⏳ Implementar consulta RUT
- [ ] ⏳ Implementar consulta DTE
- [ ] ⏳ Integrar con Telegram

### Fase 3: AFIP Integration

- [ ] ⏳ Crear afip_client.py
- [ ] ⏳ Implementar consulta CUIT
- [ ] ⏳ Implementar consulta Factura
- [ ] ⏳ Integrar con Telegram

### Fase 4: Contador Dashboard

- [ ] ⏳ Crear reportes automáticos
- [ ] ⏳ Balance general
- [ ] ⏳ Vencimientos
- [ ] ⏳ Integrar con Telegram

---

**Estado:** ✅ **DISEÑADO - LISTO PARA IMPLEMENTAR**
