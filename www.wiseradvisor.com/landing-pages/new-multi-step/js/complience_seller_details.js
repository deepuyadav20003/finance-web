// Constants
const API_CONFIG = {
	BASE_URL: '/rest/advisors/tcpa/detail',
	ENDPOINTS: {
		MATCH: '/detail'
	}
};

// DOM Elements
const DOM = {
	firmList: $('#firmList')
};

const fetchAdvisorProfiles = async () => {
	try {

		const response = await $.ajax({
			url: API_CONFIG.BASE_URL,
			type: 'GET',
			contentType: 'application/json', // Specify that we're sending JSON
			timeout: 30000,                  // 10 second timeout
			dataType: 'json'                 // Expecting JSON response
		});

		// Return the response data (list of profiles)
		return response.result;
	} catch (error) {
		console.error('Error fetching advisor profiles:', error);
		throw new Error('Failed to fetch advisor profiles. Please try again later.');
	}
};


// Function to dynamically update the firm list based on the response
function updateFirmList(firms) {
	const firmList = $('#firmList');
/*	firmList.find('li:gt(0)').remove(); // Remove existing firm entries, keeping 'Select All'*/
	// Loop through each firm and append to list
	firms.forEach((firm, index) => {
		switch (firm.accountType) {
			case 'F':
				const listItem1 = `
									<li>
										<div class="option-select">
											<label>
											<div class="advisor-card mb-2">
												<img
													src="https://images.wiseradvisor.com${firm.logo}">
												<div class="advisor-detail">
													<h1 class="mb-1">${firm.firmName}</h1>
													${firm.rating ? `
							                            <div class="experience mb-1">
							                                Rating <b>: ${firm.rating}</b>
							                            </div>` : ''}
													${firm.experience ? `
							                            <div class="experience mb-1">
							                                Experience <b>: ${firm.experience} years</b>
							                            </div>` : ''}
													${firm.startyr ? `
													   <div class="experience mb-1">
															Firm Start Year <b>: ${firm.startyr}</b>
														</div>` : ''}
													${firm.feeStructure ? `
							                            <div class="experience mb-1">
							                                Fee Structure <b>: ${firm.feeStructure}</b>
							                            </div>` : ''}
													<div class="f-firm-name mb-1">More details available
														once matched.</div>
												</div>
											</div>
											<div class="check-box"> <input type="checkbox"
												name="advisor_compl" value="${firm.sellerId}" onclick="clickEvent('compliance', this.checked ? 'Checked -${firm.firmName}' : 'Unchecked -${firm.firmName}');"> <span
												class="checkmark"></span>
												<p class="mb-0">I consent to receive text messages and
													calls from ${firm.firmName} to the phone number
													provided. I understand that I may revoke consent at any
													time. I understand that consent is not a condition of
													purchase.</p>
											</div>
											</label>
										</div>
									</li>
						        `;
				firmList.append(listItem1);
				break;
			case 'A':
				const listItem = `
									<li>
										<div class="option-select">
											<label>
											<div class="advisor-card">
												<img
													src="https://images.wiseradvisor.com${firm.photo}">
												<div class="advisor-detail">
													<h1 class="mb-1">${firm.firstnm}&nbsp;${firm.lastnm}</h1>
													<div class="f-firm-name mb-1">${firm.firmName}</div>
													${firm.rating ? `
							                            <div class="experience mb-1">
							                                Rating <b>: ${firm.rating} years</b>
							                            </div>` : ''}
													${firm.experience ? `
							                            <div class="experience mb-1">
							                                Experience <b>: ${firm.experience} years</b>
							                            </div>` : ''}
													${firm.feeStructure ? `
							                            <div class="experience mb-1">
							                                Fee Structure <b>: ${firm.feeStructure}</b>
							                            </div>` : ''}
													<div class="f-firm-name mb-1">More details available
														once matched.</div>
												</div>
											</div>
											<div class="check-box"> <input type="checkbox"
												name="advisor_compl" value="${firm.sellerId}"> <span
												class="checkmark" onclick="clickEvent('compliance', this.checked ? 'Checked -${firm.firstnm}' : 'Unchecked -${firm.firstnm}');"></span>
												<p class="mb-0">I consent to receive text messages and
													calls from ${firm.firmName}&nbsp;${firm.lastnm} to the phone number
													provided. I understand that I may revoke consent at any
													time. I understand that consent is not a condition of
													purchase.</p>
											</div>
											</label>
										</div>
									</li>
						        `;
				firmList.append(listItem1);
				break;
			default:
				// Optional: handle other account types or skip
				break;
		}
	});
}



// Event Handlers
async function getTcpaSellersDetails() {
	try {
		const firms = await fetchAdvisorProfiles();
		updateFirmList(firms);

		// Trigger success notification
		showNotification('success', 'Firms fetched successfully!');
	} catch (error) {
		showNotification('error', error.message);
	}
}

// Simple notification system
const showNotification = (type, message) => {
	console.log(type + "$$$$$$$$$$$$$$$$" + message);
};
