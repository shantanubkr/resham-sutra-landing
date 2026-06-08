# Resham Sutra — Field Details for Every Entity

**Purpose:** For each person, object, or record in the system, we need to know exactly what data to store. Please fill in the "Answer / Notes" field under each section — confirm the fields listed, strike out any you don't want, and add anything that's missing.

**Legend:**  
- ✅ = we already store this in the demo  
- 🔲 = proposed but not yet confirmed  
- ❌ = explicitly not collecting

---

## Table of Contents

1. [Producer](#1-producer)
2. [Resham Doot (Field Staff)](#2-resham-doot-field-staff)
3. [Central Admin](#3-central-admin)
4. [Cluster](#4-cluster)
5. [Buyer](#5-buyer)
6. [Produce / Product Listing](#6-produce--product-listing)
7. [Scheme (Government Programme)](#7-scheme-government-programme)
8. [Training Record](#8-training-record)
9. [Express Interest (Buyer → Cluster)](#9-express-interest-buyer--cluster)
10. [Monthly Production Entry](#10-monthly-production-entry)

---

## 1. Producer

> A producer is an artisan, farmer, spinner, weaver, or any silk-livelihoods worker onboarded by a Resham Doot.

**Answer / Notes:** *(confirm fields, strike out unwanted, add missing)*

---

### 1.1 Identity

| # | Field | Example / format | ✅ / 🔲 / ❌ |
|---|-------|-----------------|------------|
| 1 | Full name | Text | ✅ |
| 2 | Profile photo | Image (mandatory at onboarding) | ✅ |
| 3 | Date of birth | DD/MM/YYYY | ✅ |
| 4 | Gender | Female / Male / Other / Prefer not to say | 🔲 |
| 5 | Marital status | Single / Married / Widowed / Separated | 🔲 |
| 6 | Phone number (primary) | 10-digit mobile | ✅ |
| 7 | Alternate / family phone | 10-digit mobile | 🔲 |
| 8 | WhatsApp number | 10-digit (may differ from primary) | 🔲 |
| 9 | Email address | Text | 🔲 |
| 10 | National ID type | Aadhaar / Voter ID / Ration Card / Other | 🔲 |
| 11 | National ID number | Text (stored masked) | 🔲 |
| 12 | Producer system code | Auto-generated, e.g. RS-VLG-00   1 | ✅ |
| 13 | QR code | Generated from producer code | ✅ |

---

### 1.2 Location

| # | Field | Example / format | ✅ / 🔲 / ❌ |
|---|-------|-----------------|------------|
| 1 | Cluster (= village) | Dropdown — assigned cluster | ✅ |
| 2 | Village name | Derived from cluster | ✅ |
| 3 | District | Text | 🔲 |
| 4 | State | Text | 🔲 |
| 5 | Home address / street locality | Text | 🔲 |
| 6 | PIN code | 6-digit | 🔲 |
| 7 | Distance to nearest market or road | < 5 km / 5–20 km / > 20 km | 🔲 |
| 8 | Network / connectivity quality | Good / Moderate / Poor / No signal | 🔲 |
| 9 | GPS coordinates | Lat / long | ❌ (deferred) |

---

### 1.3 Category & Role

| # | Field | Example / format | ✅ / 🔲 / ❌ |
|---|-------|-----------------|------------|
| 1 | Producer category | Multi-select from taxonomy | ✅ |
| 2 | Primary category | One of the above selections | ✅ |
| 3 | Sub-type / role within category | e.g. Handloom weaver, Muga farmer | 🔲 |
| 4 | Skill level per category | Beginner / Intermediate / Advanced / Master | 🔲 |

**What are all the categories and their sub-types?**  
*(List the full tree below — we'll use exactly what you write here)*

| Top-level category | Sub-types / roles | Notes |
|-------------------|-------------------|-------|
| Weaver | Handloom weaver, Power loom, Jacquard weaver | |
| Spinner | Hand spinner, Charkha, Machine spinner | |
| Dyer | Natural dyer, Chemical dyer, Block printer | |
| Silk Farmer | Mulberry, Eri, Muga, Tasar | |
| Machine Operator | Reeling, Twisting, Warping | |
| Finisher | Edge finisher, Embroiderer, Embellisher | |
| Designer | Pattern designer, Motif creator, CAD | |
| Trainer | Skill trainer, Loom trainer, Quality trainer | |
| Seller | Individual, SHG seller, Aggregator | |
| Aggregator | Yarn, Fabric, Produce | |
| Stitcher | Tailor, Cut-and-sew, Blouse stitcher | |
| *(add rows)* | | |

---

### 1.4 Skills

| # | Field | Example / format | ✅ / 🔲 / ❌ |
|---|-------|-----------------|------------|
| 1 | Skill tags | Multi-select from predefined list | ✅ |
| 2 | Years of experience (overall) | Integer | ✅ |
| 3 | Years of experience per skill | Integer per tag | 🔲 |
| 4 | Can train others | Yes / No | 🔲 |
| 5 | Apprentice / mentor flag | Yes / No | 🔲 |
| 6 | Free-text skill note | Text | 🔲 |

**What are all the skill tags?**  
*(List every tag — include Hindi and Assamese names if you have them)*

| Skill tag (English) | Skill group | Hindi | Assamese |
|--------------------|-------------|-------|----------|
| Handloom weaving | Weaving | | |
| Jacquard weaving | Weaving | | |
| Saree weaving | Weaving | | |
| Mekhela Chadar weaving | Weaving | | |
| Hand spinning | Spinning | | |
| Charkha spinning | Spinning | | |
| Machine spinning | Spinning | | |
| Natural dyeing | Dyeing | | |
| Block printing | Dyeing | | |
| Mulberry cultivation | Silk farming | | |
| Cocoon rearing | Silk farming | | |
| Eri rearing | Silk farming | | |
| Muga rearing | Silk farming | | |
| Silk reeling | Reeling | | |
| Yarn twisting | Reeling | | |
| Hand embroidery | Finishing | | |
| Machine embroidery | Finishing | | |
| Motif / pattern design | Design | | |
| *(add rows)* | | | |

---

### 1.5 Economic & Livelihood

| # | Field | Example / format | ✅ / 🔲 / ❌ |
|---|-------|-----------------|------------|
| 1 | Primary livelihood | Text — what they do for main income | ✅ |
| 2 | Income baseline (range band) | Rupee bracket dropdown | ✅ |
| 3 | Monthly income from silk / weaving | Separate range band | 🔲 |
| 4 | Annual household income | Range band | 🔲 |
| 5 | Bank account holder | Yes / No | 🔲 |
| 6 | Bank name | Text | 🔲 |
| 7 | Jan Dhan / PMJDY account | Yes / No | 🔲 |
| 8 | Savings / SHG savings | Amount or range band | 🔲 |
| 9 | BPL status | Yes / No | ❌ (not collecting) |

**What are the income range bands (rupee brackets)?**

| Band | Monthly income range |
|------|---------------------|
| Band 1 | ₹ _______ – ₹ _______ |
| Band 2 | ₹ _______ – ₹ _______ |
| Band 3 | ₹ _______ – ₹ _______ |
| Band 4 | ₹ _______ – ₹ _______ |
| Band 5 | ₹ _______ and above |

---

### 1.6 Household & Social

| # | Field | Example / format | ✅ / 🔲 / ❌ |
|---|-------|-----------------|------------|
| 1 | Household size (total members) | Integer | ✅ |
| 2 | Number of dependents | Integer | ✅ |
| 3 | Number of earning members | Integer | 🔲 |
| 4 | Children under 14 in household | Integer | 🔲 |
| 5 | Elderly (60+) in household | Integer | 🔲 |
| 6 | Differently-abled members in household | Integer | 🔲 |
| 7 | SHG / cooperative name | Text | 🔲 |
| 8 | SHG membership status | Member / Leader / Not a member | 🔲 |
| 9 | SHG ID / code | Text | 🔲 |
| 10 | Caste category | SC / ST / OBC / General / Other | 🔲 |
| 11 | Tribe / community | Text | 🔲 |
| 12 | Religion | Text / dropdown | 🔲 |
| 13 | Land ownership | Yes / No | 🔲 |

---

### 1.7 Tools, Assets & Workspace

| # | Field | Example / format | ✅ / 🔲 / ❌ |
|---|-------|-----------------|------------|
| 1 | Has access to machine / loom | Yes / No | ✅ |
| 2 | Machine / tool type | Handloom / Power loom / Reeling machine / Charkha / etc. | 🔲 |
| 3 | Machine ownership | Owned / Rented / Shared / Cooperative | 🔲 |
| 4 | Number of looms | Integer | 🔲 |
| 5 | Machine condition | Good / Needs repair / Non-functional | 🔲 |
| 6 | Year machine acquired | Year (4-digit) | 🔲 |
| 7 | Workspace type | Home / Shared shed / Cooperative / Factory | 🔲 |
| 8 | Electricity access at workspace | Yes / No | 🔲 |
| 9 | Water access at workspace | Yes / No | 🔲 |
| 10 | Smartphone / internet access | Yes / No | 🔲 |
| 11 | Raw material sourcing | Self / Cluster supply / NGO supply / Market | 🔲 |
| 12 | Raw material type | Silk / Cotton / Wool / Synthetic / Mixed | 🔲 |

---

### 1.8 Seller Details *(only if producer is also a seller)*

| # | Field | Example / format | ✅ / 🔲 / ❌ |
|---|-------|-----------------|------------|
| 1 | Is a seller | Yes / No flag | ✅ |
| 2 | Sells through | SHG / Individual / Market / Online / Aggregator | 🔲 |
| 3 | Markets / platforms sold on | Text | 🔲 |
| 4 | Average monthly sales value | Range band or ₹ | 🔲 |

---

### 1.9 Profile Metadata *(system-generated, not entered manually)*

| # | Field | ✅ / 🔲 / ❌ |
|---|-------|------------|
| 1 | Date of registration | ✅ |
| 2 | Profile created by (Resham Doot) | ✅ |
| 3 | Last edited by | ✅ |
| 4 | Last edited at | ✅ |
| 5 | Profile completion % | ✅ |
| 6 | Active / inactive status | ✅ |
| 7 | Edit request flag | ✅ |
| 8 | Growth pathway notes (by Doot) | ✅ |
| 9 | Internal admin notes | ✅ |
| 10 | Profile verified flag | 🔲 |

---

## 2. Resham Doot (Field Staff)

> A Resham Doot is a field staff member who onboards and manages producers within one or more clusters.

**Answer / Notes:** *(confirm fields, strike out unwanted, add missing)*

| # | Field | Example / format | ✅ / 🔲 / ❌ |
|---|-------|-----------------|------------|
| 1 | Full name | Text | ✅ |
| 2 | Phone number | 10-digit mobile | ✅ |
| 3 | Email address | Login credential | ✅ |
| 4 | Profile photo | Image | 🔲 |
| 5 | Gender | Female / Male / Other | 🔲 |
| 6 | Date of birth | DD/MM/YYYY | 🔲 |
| 7 | Assigned cluster(s) | Cluster reference(s) | ✅ |
| 8 | Employment type | Full-time / Part-time / Volunteer / Contractual | 🔲 |
| 9 | Date joined / onboarded | Date | ✅ |
| 10 | Designation / title | Text | 🔲 |
| 11 | Reporting manager | Admin reference | 🔲 |
| 12 | Language preference | English / Hindi / Assamese | 🔲 |
| 13 | Home district / location | Text | 🔲 |
| 14 | Education level | Text / dropdown | 🔲 |
| 15 | Years of field experience | Integer | 🔲 |
| 16 | Active / inactive status | Boolean | ✅ |
| 17 | Notes / internal comments | Text | 🔲 |
| 18 | Date account created | Timestamp (system) | ✅ |
| 19 | Last login | Timestamp (system) | ✅ |

**What other information do you track about Resham Doots that we haven't listed?**

Answer / Notes: _______________________________________________

---

## 3. Central Admin

> Central admin staff have full system access across all clusters.

**Answer / Notes:** *(confirm fields, strike out unwanted, add missing)*

| # | Field | Example / format | ✅ / 🔲 / ❌ |
|---|-------|-----------------|------------|
| 1 | Full name | Text | ✅ |
| 2 | Email address | Login credential | ✅ |
| 3 | Phone number | 10-digit mobile | ✅ |
| 4 | Profile photo | Image | 🔲 |
| 5 | Designation / title | e.g. Programme Manager | 🔲 |
| 6 | Department | Text | 🔲 |
| 7 | Active / inactive status | Boolean | ✅ |
| 8 | Date account created | Timestamp (system) | ✅ |
| 9 | Last login | Timestamp (system) | ✅ |
| 10 | Notes | Internal text | 🔲 |

**How many central admin accounts are needed at pilot launch? Please list each person (name + email).**

Answer / Notes: _______________________________________________

---

## 4. Cluster

> A cluster = one village. It is the geographic and organisational unit that groups producers under one Resham Doot.

**Answer / Notes:** *(confirm fields, strike out unwanted, add missing)*

| # | Field | Example / format | ✅ / 🔲 / ❌ |
|---|-------|-----------------|------------|
| 1 | Cluster name | Text — same as village name | ✅ |
| 2 | Village name(s) | Text (one village per cluster in pilot) | ✅ |
| 3 | Cluster code / ID | Auto-generated | ✅ |
| 4 | District | Text | 🔲 |
| 5 | State | Text | 🔲 |
| 6 | PIN code | 6-digit | 🔲 |
| 7 | Assigned Resham Doot | Doot reference | ✅ |
| 8 | Date cluster established / added | Date | 🔲 |
| 9 | Active / inactive status | Boolean | ✅ |
| 10 | Primary produce types | Silk / Cotton / Cocoon / Mixed | 🔲 |
| 11 | Dominant silk type | Muga / Eri / Mulberry / Tasar | 🔲 |
| 12 | Cluster photo / banner image | Image | 🔲 |
| 13 | Description / notes | Text | 🔲 |
| 14 | Nearest town / market | Text | 🔲 |
| 15 | Road connectivity | Good / Seasonal / Poor | 🔲 |

**What are the official pilot cluster names?**  
*(List every village that will be live at pilot launch)*

| Cluster / village name | District | State | Notes |
|-----------------------|----------|-------|-------|
| | | | |
| | | | |
| | | | |

---

## 5. Buyer

> Buyers discover clusters and products, and can express interest in purchasing.

**Answer / Notes:** *(confirm fields, strike out unwanted, add missing)*

### 5.1 Registration (collected at sign-up)

| # | Field | Example / format | ✅ / 🔲 / ❌ |
|---|-------|-----------------|------------|
| 1 | Full name | Text | ✅ |
| 2 | Email address | Login credential | ✅ |
| 3 | Phone number | 10-digit mobile | ✅ |
| 4 | Password | Hashed | ✅ |
| 5 | Profile photo | Image | 🔲 |
| 6 | Preferred language | English / Hindi / Assamese | 🔲 |

### 5.2 Business / Professional Details

| # | Field | Example / format | ✅ / 🔲 / ❌ |
|---|-------|-----------------|------------|
| 1 | Organisation / company name | Text | 🔲 |
| 2 | Organisation type | Individual / SME / Corporate / NGO / Export house / Designer / Retailer / Wholesaler / Govt | 🔲 |
| 3 | Website URL | Text | 🔲 |
| 4 | GST number | Text | 🔲 |
| 5 | Business registration number | Text | 🔲 |
| 6 | Annual buying volume (approx.) | Range band | 🔲 |
| 7 | Products of interest | Sarees / Fabric / Yarn / Cocoons / Garments / Other | 🔲 |
| 8 | Buyer intent / segment | Reseller / Own label / Export / CSR gifting / Personal use | 🔲 |
| 9 | Geographic sourcing preference | Text | 🔲 |
| 10 | Billing address | Text | 🔲 |
| 11 | Shipping address | Text | 🔲 |

**Which of these business fields do you want collected, and at what point — at registration or only when they submit their first express interest?**

Answer / Notes: _______________________________________________

---

## 6. Produce / Product Listing

> A product listing represents a type of goods available from a cluster, shown in the buyer-facing catalog.

**Answer / Notes:** *(confirm fields, strike out unwanted, add missing)*

### 6.1 Product Identity

| # | Field | Example / format | ✅ / 🔲 / ❌ |
|---|-------|-----------------|------------|
| 1 | Product name | Text | 🔲 |
| 2 | Product type / category | Saree / Mekhela Chadar / Fabric / Yarn / Cocoon / Raw silk / Dupatta / Stole / Garment / Other | 🔲 |
| 3 | Silk type | Muga / Eri / Mulberry / Tasar / Cotton / Blended | 🔲 |
| 4 | Weave type | Plain / Twill / Satin / Jacquard / Ikkat / Other | 🔲 |
| 5 | Sub-type / variant name | Text | 🔲 |
| 6 | Origin cluster | Cluster reference | ✅ |
| 7 | Producer(s) who made it | Producer reference(s) | 🔲 |
| 8 | Product code / SKU | Auto-generated or manual | 🔲 |
| 9 | Product photo(s) | Images — multi-upload | 🔲 |
| 10 | Description (buyer-facing) | Text | 🔲 |
| 11 | Traditional / cultural significance | Text | 🔲 |
| 12 | Festival / occasion relevance | Bihu / Durga Puja / Diwali / Wedding / Export | 🔲 |

**What are all the product types / categories for the catalog?**  
*(We'll use exactly this list for the buyer browse filters)*

Answer / Notes: _______________________________________________

### 6.2 Quantities & Dimensions

| # | Field | Unit | ✅ / 🔲 / ❌ |
|---|-------|------|------------|
| 1 | Quantity available | Pieces / metres / kg | 🔲 |
| 2 | Unit of measure | Pieces / Metres / Kilograms / Grams | 🔲 |
| 3 | Minimum order quantity (MOQ) | Same unit as above | 🔲 |
| 4 | Length of fabric / saree | Metres | 🔲 |
| 5 | Width of fabric | Centimetres or inches | 🔲 |
| 6 | Weight per unit | Grams | 🔲 |
| 7 | Total weight of listing | Kilograms | 🔲 |
| 8 | Stock replenishment lead time | Days / weeks | 🔲 |

### 6.3 Quality & Certifications

| # | Field | Example / format | ✅ / 🔲 / ❌ |
|---|-------|-----------------|------------|
| 1 | Quality grade | A+ / A / B / C | 🔲 |
| 2 | Grading standard | Resham Sutra internal / Silk Board / ISI / GI | 🔲 |
| 3 | Silk Mark certified | Yes / No | 🔲 |
| 4 | Silk Mark registration number | Text | 🔲 |
| 5 | GI (Geographical Indication) tagged | Yes / No | 🔲 |
| 6 | GI tag number | Text | 🔲 |
| 7 | Handmade / handloom certified | Yes / No | 🔲 |
| 8 | Handloom Mark certification | Yes / No + file upload | 🔲 |
| 9 | Organic / natural dye | Yes / No | 🔲 |
| 10 | Eco-friendly certified | Yes / No | 🔲 |
| 11 | Thread count (EPI × PPI) | Numbers | 🔲 |
| 12 | Denier of warp yarn | Number | 🔲 |
| 13 | Denier of weft yarn | Number | 🔲 |
| 14 | Defect % | Number | 🔲 |
| 15 | Batch / lot number | Text | 🔲 |
| 16 | MSME registration | Yes / No | 🔲 |
| 17 | Export clearance | Yes / No | 🔲 |
| 18 | Child labour free declaration | Yes / No | 🔲 |
| 19 | Fair trade certified | Yes / No | 🔲 |

### 6.4 Pricing

| # | Field | Example / format | ✅ / 🔲 / ❌ |
|---|-------|-----------------|------------|
| 1 | Producer price (cost to make) | ₹ per unit | 🔲 |
| 2 | Minimum selling price | ₹ per unit | 🔲 |
| 3 | Recommended retail price | ₹ per unit | 🔲 |
| 4 | Bulk price at MOQ | ₹ per unit | 🔲 |
| 5 | Price includes GST | Yes / No | 🔲 |
| 6 | GST rate | % | 🔲 |

### 6.5 Availability & Seasonality

| # | Field | Example / format | ✅ / 🔲 / ❌ |
|---|-------|-----------------|------------|
| 1 | Season available | All year / Jan–Mar / Apr–Jun / Jul–Sep / Oct–Dec | 🔲 |
| 2 | Lead time for custom order | Number of days | 🔲 |
| 3 | Cocoon harvest season | Month range | 🔲 |
| 4 | Reeling / weaving season | Month range | 🔲 |
| 5 | Last batch produced date | Date | 🔲 |
| 6 | Next expected batch date | Date | 🔲 |

---

## 7. Scheme (Government Programme)

> One record per scheme in the master scheme database. Producers are matched to schemes based on eligibility.

**Answer / Notes:** *(confirm fields, strike out unwanted, add missing)*

| # | Field | Example / format | ✅ / 🔲 / ❌ |
|---|-------|-----------------|------------|
| 1 | Scheme name (English) | Text | ✅ |
| 2 | Scheme name (Hindi) | Text | 🔲 |
| 3 | Scheme name (Assamese) | Text | 🔲 |
| 4 | Scheme code | Internal or govt code | 🔲 |
| 5 | Administering body | Central Govt / State Govt / NGO / Bilateral | 🔲 |
| 6 | Scheme type | Subsidy / Loan / Training / Insurance / Market linkage / Equipment / Other | 🔲 |
| 7 | Benefit description | Text | 🔲 |
| 8 | Benefit value (approx.) | Text or ₹ amount | 🔲 |
| 9 | Eligibility — gender | Female / Male / Any | ✅ |
| 10 | Eligibility — minimum age | Integer (years) | ✅ |
| 11 | Eligibility — maximum age | Integer (years) | ✅ |
| 12 | Eligibility — producer category | Multi-select from category taxonomy | ✅ |
| 13 | Eligibility — caste | SC / ST / OBC / Any | 🔲 |
| 14 | Eligibility — state / geography | Text | 🔲 |
| 15 | Eligibility — other criteria | Text | 🔲 |
| 16 | Application URL | URL | 🔲 |
| 17 | Application process description | Text | 🔲 |
| 18 | Documents required to apply | Text list | 🔲 |
| 19 | Deadline / last date | Date or "Rolling" | 🔲 |
| 20 | Scheme active / inactive | Boolean | ✅ |
| 21 | Disclaimer text | e.g. "Suggested eligibility only — not a guarantee" | ✅ |
| 22 | Source / reference document | File upload or URL | 🔲 |
| 23 | Who maintains this record | Named person / role | 🔲 |
| 24 | Review cadence | Quarterly / Annually / etc. | 🔲 |
| 25 | Last verified date | Date | ✅ |
| 26 | Notes | Text | 🔲 |

**Please list the 10–15 schemes you want in the pilot database:**

| Scheme name | Administering body | Type | Who is eligible | Benefit |
|------------|-------------------|------|----------------|---------|
| | | | | |
| | | | | |
| | | | | |
| | | | | |
| | | | | |

---

## 8. Training Record

> One record per training attended — a producer can have multiple. These are logged by Resham Doot.

**Answer / Notes:** *(confirm fields, strike out unwanted, add missing)*

| # | Field | Example / format | ✅ / 🔲 / ❌ |
|---|-------|-----------------|------------|
| 1 | Training programme name | Text | ✅ |
| 2 | Organising body / institution | Text | ✅ |
| 3 | Training type | Skill / Business / Digital / Health / Other | 🔲 |
| 4 | Skill area covered | Dropdown linked to skill tags | 🔲 |
| 5 | Mode of delivery | In-person / Online / Hybrid | 🔲 |
| 6 | Venue / location | Text | 🔲 |
| 7 | Start date | Date | ✅ |
| 8 | End date / completion date | Date | 🔲 |
| 9 | Duration | Integer (days or hours) | 🔲 |
| 10 | Funded by | NGO / Govt / Resham Sutra / Private / Other | 🔲 |
| 11 | Trainer / facilitator name | Text | 🔲 |
| 12 | Certificate received | Yes / No | ✅ |
| 13 | Certificate upload | PDF or image file | ✅ |
| 14 | Certificate ID / number | Text | 🔲 |
| 15 | Certificate expiry date | Date | 🔲 |
| 16 | Assessment score | Number or grade | 🔲 |
| 17 | Total participants in this session | Integer | 🔲 |
| 18 | Attendance sheet upload | File | 🔲 |
| 19 | Notes | Text | 🔲 |
| 20 | Logged by | User reference (system) | ✅ |
| 21 | Logged at | Timestamp (system) | ✅ |

---

## 9. Express Interest (Buyer → Cluster)

> Created when a buyer clicks "Express interest" on a cluster or product. Notifies admin and Resham Doot.

**Answer / Notes:** *(confirm fields, strike out unwanted, add missing)*

| # | Field | Example / format | ✅ / 🔲 / ❌ |
|---|-------|-----------------|------------|
| 1 | Buyer reference | Buyer ID | ✅ |
| 2 | Cluster reference | Cluster ID | ✅ |
| 3 | Product / listing reference | Listing ID (if interest is on a specific product) | 🔲 |
| 4 | Message from buyer | Text | 🔲 |
| 5 | Quantity interested in | Number + unit | 🔲 |
| 6 | Intended use | Text | 🔲 |
| 7 | Requested delivery timeline | Date or free text | 🔲 |
| 8 | Status | New / Acknowledged / In discussion / Closed / Rejected | ✅ |
| 9 | Submitted at | Timestamp | ✅ |
| 10 | Admin notified | Boolean (system) | ✅ |
| 11 | Resham Doot notified | Boolean (system) | ✅ |
| 12 | Admin response notes | Text | 🔲 |
| 13 | Closed at | Timestamp | 🔲 |
| 14 | Outcome | Order placed / No match / Follow-up needed / Cancelled | 🔲 |

---

## 10. Monthly Production Entry

> One entry per producer per month. This is the core data for tracking output and cluster-level production aggregates.

**Answer / Notes:** *(confirm fields, strike out unwanted, add missing — and mark which fields apply to which producer category)*

| # | Field | Unit | Applies to which categories | ✅ / 🔲 / ❌ |
|---|-------|------|----------------------------|------------|
| 1 | Entry month | MM/YYYY | All | ✅ |
| 2 | Silk fabric woven | Metres (m) | Weaver | ✅ |
| 3 | Raw produce — general | Kilograms (kg) | All | ✅ |
| 4 | Cocoons harvested / handled | Kilograms (kg) | Silk Farmer | ✅ |
| 5 | Yarn spun | Grams or kg | Spinner | 🔲 |
| 6 | Yarn reeled | Grams or kg | Machine Operator | 🔲 |
| 7 | Items dyed / printed | Pieces or metres | Dyer | 🔲 |
| 8 | Sarees / garments produced | Pieces | Weaver / Stitcher | 🔲 |
| 9 | Embroidered items produced | Pieces | Finisher | 🔲 |
| 10 | Working days in month | Days (1–31) | All | 🔲 |
| 11 | Hours worked per day (avg) | Hours | All | 🔲 |
| 12 | Items sold this month | Pieces | Seller | 🔲 |
| 13 | Revenue from sales this month | ₹ | Seller | 🔲 |
| 14 | Income from production this month | ₹ or range band | All | 🔲 |
| 15 | Unsold stock (carryover) | Pieces or kg | Seller | 🔲 |
| 16 | Raw material used | kg or metres | All | 🔲 |
| 17 | Raw material sourced from | Self / Cluster / NGO supply / Market | All | 🔲 |
| 18 | Notes / context | Text | All | 🔲 |
| 19 | Entry logged by | User reference (system) | — | ✅ |
| 20 | Entry timestamp | Timestamp (system) | — | ✅ |

**For each output field above, please mark which producer categories must fill it in:**

| Output field | Weaver | Spinner | Silk Farmer | Dyer | Machine Op. | Stitcher | Finisher | All |
|-------------|--------|---------|-------------|------|-------------|----------|----------|-----|
| Silk fabric woven (m) | | | | | | | | |
| Raw produce (kg) | | | | | | | | |
| Cocoons (kg) | | | | | | | | |
| Yarn spun | | | | | | | | |
| Yarn reeled | | | | | | | | |
| Items dyed / printed | | | | | | | | |
| Sarees / garments | | | | | | | | |
| Embroidered items | | | | | | | | |
| Working days | | | | | | | | |
| Items sold | | | | | | | | |
| Revenue from sales | | | | | | | | |

---

*This document is a data-collection spec only. Product decisions (access rules, workflows, feature scoping) are in [product-buildout-requirements.md](./product-buildout-requirements.md).*
