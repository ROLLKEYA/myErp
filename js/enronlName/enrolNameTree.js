console.log(54255);
var recommedList =''
 var orderNo=''
function payfor(dataNb){
    console.log(11111111111111111)
    console.log(dataNb);
      orderNo=dataNb;
      $('#gt-wwxfli').html('<div class="gt-butonCom gt-nextBut " id="gt-butonNext"><span>支付</span></div> <div  id="gt-Nobug" class="gt-butonCom gt-cancelBut "><span>返回</span></div>');
               $('#gt-Qcodepay').val(' ');
                    $('.gt-backCur,.gt-backSp,#gt-wwxfli #gt-Nobug').on('click',function(){
                               $('iframe', parent.document).hide();
                               $('#gt-deail', parent.document).show();
                                $('.gt-NavSupply ', parent.document).removeClass('gt-navBlock');
                                $('.gt-NavStage ', parent.document).addClass('gt-navBlock');
                                $('#gt-NavSupply ', parent.document).removeClass('gt-buttonClik');
                                $('#gt-NavStage', parent.document).addClass('gt-buttonClik');
                                $('#gt-NavStage', parent.document).removeClass('gt-navBlock');
    
                        });
                      
    //    $('#gt-butonNext').attr('data-id',orderNo)
                 $.ajax({
          url:url+'/selectOrderByOrderNo.do',
                data:{
                 orderNo:orderNo,                   

                },
                       type:'post',
                    dataType:'json',
                    success: function(res){                                       

                console.log(res)
                    if(res.code===100){
                      /*  consumption 为空则没有会员信息*/
                      var  data=res.data
                      var htl=''
                      var objc={};
                      recommedList=[];
                      for(var i=0;i<data.recommendList.length;i++){
                         objc={};
                         htl+='   <tr class="gt-dataTr">\
                         <td data-id="'+data.recommendList[i].enrollid+'" class="gt-Edatli0">'+data.recommendList[i].enrollName +'</td>\
                         <td class="gt-Edatli1">'+data.recommendList[i].money +'</td>\
                         <td class="gt-Edatli2">'+data.recommendList[i].giveCash  +'</td>\
                         <td class="gt-Edatli3">'+data.recommendList[i].giveFans +'</td>\
                         <td  class="gt-Edatli4">'+data.recommendList[i].giveIntegral +'</td>\
                         <td class="gt-Edatli5">'+data.recommendList[i].reductionMoney +'</td>\
                         </tr>'
                         objc.Enrollid=data.recommendList[i].enrollid;
                         objc.orderNo=orderNo;
                         objc.buyMoney=data.recommendList[i].money;
                         objc.giveCash=data.recommendList[i].giveCash;
                         objc.giveFans=data.recommendList[i].giveFans ;
                         objc.giveIntegral=data.recommendList[i].giveIntegral;
                         objc.recommendCode=data.recommendList[i].recommendCode;
                        //   objc.Enrollid='12';
                        //  objc.orderNo=orderNo;
                        //  objc.buyMoney='';
                        //  objc.giveCash='';
                        //  objc.giveFans='';
                        //  objc.giveIntegral='';
                        //  objc.recommendCode='1';

                         recommedList.push(objc);
                         console.log(objc)
                         console.log(orderNo)

                      }


                      var codeHtml='<tr class="gt-dataTr">\
                      <td class="gt-Edatli0">报名活动名称</td>\
                      <td class="gt-Edatli1">报名活动金额</td>\
                      <td class="gt-Edatli2">赠送现金</td>\
                      <td class="gt-Edatli3">赠送粉币</td>\
                      <td  class="gt-Edatli4">赠送积分</td>\
                      <td  class="gt-Edatli5">减免金额</td>\
                      </tr>'
                      $('#gt-listCodes').html(codeHtml+ htl)
                      
                      console.log( recommedList)
                      recommedList=JSON.stringify(recommedList);

                         var enterHtml='';

                      if(data.consumption===undefined||data.consumption===''||data.consumption===null)
                        {
                            $('.gt-Elist').hide();
                           $('#gt-Qmeber').hide();
                            $('.gt-consumption').hide();
                            $('#gt-butonNext').attr('data-oldid','');
                            $('#gt-butonNext').attr('data-deposit','0');
                            $('#gt-haspay').text('0');
                        }else{
                            
                            enterHtml=' <tr class="gt-dataTr">\
                            <td class="gt-Edatli0"> 会员卡</td>\
                            <td class="gt-Edatli1">姓名</td>\
                            <td class="gt-Edatli2">联系电话</td>\
                            <td class="gt-Edatli3">会员等级</td>\
                            <td  class="gt-Edatli4">积分</td>\
                             <td class="gt-Edatli5">粉币</td>\
                             <td class="gt-Edatli6">余额</td>\
                              </tr>\
                    <tr class="gt-dataTr">\
                            <td class="gt-Edatli0"> 11450256</td>\
                            <td class="gt-Edatli1">小多</td>\
                            <td class="gt-Edatli2">18826244125</td>\
                            <td class="gt-Edatli3">多粉会员</td>\
                            <td  class="gt-Edatli4">'+data.consumption.fans  +'</td>\
                             <td class="gt-Edatli5">'+data.consumption.integral +'</td>\
                             <td class="gt-Edatli6 gt-delte">'+data.consumption.allMoney +'</td>\
                              </tr> \ '

                              $('#gt-butonNext').attr('data-oldid',data.consumption.id);
                              $('#gt-haspay').text(data.consumption.deposit);
                              $('#gt-butonNext').attr('data-deposit',data.consumption.deposit);
                        }

                        $('#gt-QmeberTble').html(enterHtml)

                      $('#gt-Qtotal').text(data.allMoney);
                      $('#gt-haspay').text();
                      var neddpay= Number($('#gt-Qtotal').text())- Number($('#gt-haspay').text());
                      $('#gt-QneedPay').text(neddpay);
                      $('#gt-butonNext').attr('data-signid',data.id);
                      //$('#gt-butonNext').attr('data-recommedlist',data.recommendList);
                    
                                                
                      }
                        },
                         error: function(){
                            console.log('网络出错');
                                        }
                                    });

}
         

(function(){
    var enronNameTree={
       initi:function(){
            this.returned();
           this.paymentType='';
                
           },
         titel:function(){
            
             $("td").each(function(){
              
            $(this).attr("title",$(this).text());
           
           });
       },
           returned:function(){
            var self=this;

//继续报名
$('#gt-continu').on('click',function(){
    
    
                                    $.ajax({
                                           url:url+'/findGradeAllList.do',
                                            data:{
                                         
                                                                        
                                            }, 
                                            type:'post',
                                            dataType:'json',
                                            success: function(res){                                       
                                              console.log(res)
                                                 if(res.code===100){
                                                 
                                                
                                                 var html=''
                                               for(var i=0;i<res.data.length;i++){
                                      html+=" <option value='' data-id="+ res.data[i].id+" >"+ res.data[i].gradeName +"</option> "      
                                    
                                            }
    
                                    top.frames['gt-homeOne'].document.getElementById('gt-Bselect').innerHTML='<option value="" >选择年级</option>'+ html;
                                                      allSbj();                        
                                                 }
                                            },
                                            error: function(){
                                                console.log('网络出错');
                                            }
                                        });
    
    
                                  $('iframe', parent.document).hide();
                                   $('#gt-deail', parent.document).hide();
                                   $('.gt-trans',parent.document).hide();
                                     $('#gt-homeOne', parent.document).show();
                                   
                                })
    
                                
                      /*    所有科目 */
                      var allSbj=function(){
                             $.ajax({
                                           url:url+'/findSubjectAllList.do',
                                            data:{
                                         
                                                                        
                                            },
                                            type:'post',
                                            dataType:'json',
                                            success: function(res){                                       
                                              console.log(res)
                                                 if(res.code===100){
                                                 
                                                 var html=''
                                               for(var i=0;i<res.data.length;i++){
                                       html+=" <option value=''  data-id="+ res.data[i].id+" >"+ res.data[i].subjectName +"</option> "      
                                                  
                                            }
                                    top.frames['gt-homeOne'].document.getElementById('gt-Bsbujs').innerHTML= '<option value="" >选择科目</option>' +html;
                                   
    
                                                 }
                                            },
                                            error: function(){
                                                console.log('网络出错');
                                            }
                                        });
                      }

           
              /*   选择积分，优惠 */
                $('.gt-orders').on('click','.gt-cube',function(){

                    if($(this).hasClass('gt-bakImg')){

                        $(this).removeClass('gt-bakImg');
                    }else{
                        $(this).addClass('gt-bakImg');
                    }
                })


             /*    选择支付方式 */

             $('.gt-paymentWay').on('click','.gt-paymentDiv ',function(){
                 $('.gt-paymentDiv').removeClass('gt-cashBack')
                 $(this).addClass('gt-cashBack');
                
             })
          
            


             $('#gt-butback').on('click',function(){
                  $('#gt-homeTree', parent.document).hide();
                   $('#gt-homeTow', parent.document).show();
             })
                $('#gt-canback,#gt-back').on('click',function(){
                      $('#gt-trans', parent.document).hide();
                      $('.gt-trans').hide();
                      $('.gt-success').hide();
                        $('iframe', parent.document).hide();
                                $('#gt-deail', parent.document).show();
                                $('.gt-NavSupply ', parent.document).removeClass('gt-navBlock');
                                $('.gt-NavStage ', parent.document).addClass('gt-navBlock');
                                $('#gt-NavSupply ', parent.document).removeClass('gt-buttonClik');
                                $('#gt-NavStage', parent.document).addClass('gt-buttonClik');
                                $('#gt-lista', parent.document).addClass('gt-hoverClor');
                                $('#gt-lista', parent.document).siblings().removeClass('gt-hoverClor');
                                 $('.gt-provided', parent.document).show();
                                 $('.gt-provided', parent.document).siblings().hide();

                    })

                 
             $('#gt-wwxfli').on('click','#gt-butonNext',function(){
               console.log(recommedList);
                   $('.gt-paymentWay .gt-paymentDiv').each(function(){
                  if($(this).hasClass('gt-cashBack')){
                  self.paymentType=$(this).data('type');
                  }
              }) 

                //  var orderNo=$(this).data('id');
                var  actualMoney= $('#gt-Qcodepay').val();
                var   allMoney=$('#gt-QneedPay').text();
                 var  signId=$(this).data('signid');
                 var  oldId=$(this).data('oldid');
                 var  deposit=$(this).data('deposit');
                
               
                 console.log(orderNo);
                 console.log(self.paymentType);
                 console.log( actualMoney);
                      console.log(allMoney);
                      console.log(signId)

                        $.ajax({
          url:url+'/payOrder.do',
                data:{     
                    orderNo:orderNo,
                    memberId:'',
                    deposit:deposit,
                    buckleMoney :'0',
                    paymentStatus:'2',
                    paymentType:self.paymentType,
                    incomeType:'0',
                    discount:'',
                    integral:'0',
                     signId: signId,
                    actualMoney:actualMoney,
                    allMoney: allMoney,
                    recommedList:recommedList,
                    id:oldId,


          
                },
                       type:'post',
                    dataType:'json',
                    success: function(res){                                       

                console.log(res)
                    if(res.code===100){
                    
             $('#gt-trans', parent.document).show();
             $('.gt-trans').show();
             $('.gt-success').show();
                 
                 recommedList =''
                 orderNo=''
                      }
                        },
                         error: function(){
                            console.log('网络出错');
                                        }
                                    });
           
             })

         /*       找零钱    */

         $('#gt-Qcodepay').on('change',function(){
             var entrMy=Number($('#gt-Qcodepay').val());
              var  shuldMy=Number($('#gt-QneedPay').text());
              if(entrMy>shuldMy){
                $('#gt-backpay').text( Number(entrMy-shuldMy));
              }else{
                $('#gt-backpay').text( '0');
              }
           
         })


           },
    };
    enronNameTree.initi();
})()


