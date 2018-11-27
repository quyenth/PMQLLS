export class DataTableSetting{
    
   static getDefaultSetting():DataTables.Settings{
       let dtOptions :DataTables.Settings ={};
       dtOptions = {
            pagingType: 'simple_numbers',
            language:{
              paginate:{
                first:'«',
                next:'›',
                previous:'‹',
                last:'»'
              },
              info:'Hiển thị từ _START_ đến _END_ trong _TOTAL_ bản ghi',
              infoFiltered:'',
              lengthMenu:'Hiển thị _MENU_ bản ghi'
            },
             pageLength: 10,
      
            searching: false,
            serverSide: true,
            processing: true,
            columnDefs: [{
              targets: 0,
              defaultContent: '',
              width: '20px',
              orderable: false
            },
      
            ],
      
            dom: 't<l<".col-lg-8 float-right"ip>>',
            ordering:false,
            order: [[ 1, 'asc' ]],
           
           
            // processing: true
          };

          return dtOptions;
    }

}