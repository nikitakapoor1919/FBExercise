const bankState = {}

const filterListByBank = (bank) => ifscData.filter((item) => item.BANK == bank)

const filterListByBankAndState = (bank, state) => ifscData.filter((item) => item.BANK == bank && item.STATE == state)

const filterListByBankAndStateAndDistrict = (bank, state, district) => ifscData.filter((item) => item.BANK == bank && item.STATE == state && item.DISTRICT == district)

const filterListByBankAndStateAndDistrictAndBranch = (bank, state, district, branch) => ifscData.filter((item) => item.BANK == bank && item.STATE == state && item.DISTRICT == district && item.BRANCH == branch)

function calculateUniqueBankList() {
    const fullBankList = ifscData.map((item) => item.BANK)
    const bankSet = new Set(fullBankList)

    bankState.uniqueBankList = Array.from(bankSet);

    fillBankListIntoSelect()
}

function calculateUniqueStateList() {
    const fullStateList = bankState.stateList.map((item) => item.STATE)
    const stateSet = new Set(fullStateList)

    bankState.uniqueStateList = Array.from(stateSet);

    fillStateListIntoSelect()
}

function calculateUniqueDistrictList() {
    const fullDistrictList = bankState.districtList.map((item) => item.DISTRICT)
    const districtSet = new Set(fullDistrictList)

    bankState.uniqueDistrictList = Array.from(districtSet);

    fillDistrictListIntoSelect()
}

function calculateUniqueBranchList() {
    const fullBranchList = bankState.branchList.map((item) => item.BRANCH)
    const branchSet = new Set(fullBranchList)

    bankState.uniqueBranchList = Array.from(branchSet);

    fillBranchListIntoSelect()
}

function fillBankListIntoSelect() {
    document.getElementById('bank')
    const bankSelect = document.getElementById('bank')
    bankState.uniqueBankList.forEach(function(element) {
        const newOption = document.createElement("OPTION");
        newOption.text = element;
        newOption.value = element;
        bankSelect.add(newOption)
    })
}

function fillStateListIntoSelect() {
    document.getElementById('state')
    const stateSelect = document.getElementById('state')
    bankState.uniqueStateList.forEach(function(element) {
        const newOption = document.createElement("OPTION");
        newOption.text = element;
        newOption.value = element;
        stateSelect.add(newOption)
    })
}

function fillDistrictListIntoSelect() {
    document.getElementById('district')
    const districtSelect = document.getElementById('district')
    bankState.uniqueDistrictList.forEach(function(element) {
        const newOption = document.createElement("OPTION");
        newOption.text = element;
        newOption.value = element;
        districtSelect.add(newOption)
    })
}

function fillBranchListIntoSelect() {
    document.getElementById('branch')
    const branchSelect = document.getElementById('branch')
    bankState.uniqueBranchList.forEach(function(element) {
        const newOption = document.createElement("OPTION");
        newOption.text = element;
        newOption.value = element;
        branchSelect.add(newOption)
    })
}

function handleBankChange(e) {
    bankState.bank = e.target.value;
    document.getElementById('bankName').value = bankState.bank
    bankState.stateList = filterListByBank(bankState.bank)
    calculateUniqueStateList()
}

function handleStateChange(e) {
    bankState.state = e.target.value;
    bankState.districtList = filterListByBankAndState(bankState.bank, bankState.state)
    calculateUniqueDistrictList()
}

function handleDistrictChange(e) {
    bankState.district = e.target.value;
    bankState.branchList = filterListByBankAndStateAndDistrict(bankState.bank, bankState.state, bankState.district)
    calculateUniqueBranchList()
}

function handleBranchChange(e) {
    bankState.branch = e.target.value;
    bankState.result = filterListByBankAndStateAndDistrictAndBranch(bankState.bank, bankState.state, bankState.district, bankState.branch)
    console.log(bankState.result[0])
}

function setResult() {
    if (bankState.result[0] != null) {
        document.getElementById("box1").style.display = "none";
        document.getElementById("box2").style.display = "block";
        document.getElementById('bank-name-display').innerHTML = 'IFSC CODE FOR ' + bankState.result[0].BANK
        document.getElementById('state-district-display').innerHTML = bankState.result[0].STATE + '-' + bankState.result[0].DISTRICT
        document.getElementById('ifsc').innerHTML = bankState.result[0].IFSC
        document.getElementById('address').innerHTML = bankState.result[0].ADDRESS
        document.getElementById('phone').innerHTML = bankState.result[0].CONTACT
        document.getElementById('district-name').innerHTML = bankState.result[0].DISTRICT
        document.getElementById('state-name').innerHTML = bankState.result[0].STATE
        document.getElementById('bank-name').innerHTML = bankState.result[0].BANK
        document.getElementById('branch-name').innerHTML = bankState.result[0].BRANCH
    } else {
        document.getElementById('bank-name-display').innerHTML = 'NO RESULT FOUND'
    }

}

async function downloadData() {
    const res = await fetch("ifsc.json")
    window.ifscData = await res.json();
    calculateUniqueBankList();
    document.getElementById('bank').onchange = handleBankChange;
    document.getElementById('state').onchange = handleStateChange;
    document.getElementById('district').onchange = handleDistrictChange;
    document.getElementById('branch').onchange = handleBranchChange;
    document.getElementById('next').onclick = setResult
}


downloadData();
