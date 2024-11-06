$(function () {
    $("#jqGrid").jqGrid({
        url: '/admin/blogs/list',
        datatype: "json",
        colModel: [
            {label: 'id', name: 'blogId', index: 'blogId', width: 50, key: true, hidden: true},
            {label: '标题', name: 'blogTitle', index: 'blogTitle', width: 140},
            {label: '预览图', name: 'blogCoverImage', index: 'blogCoverImage', width: 120, formatter: coverImageFormatter},
            {label: '浏览量', name: 'blogViews', index: 'blogViews', width: 60},
            {label: '状态', name: 'blogStatus', index: 'blogStatus', width: 60, formatter: statusFormatter},
            {label: '置顶', name: 'isTop', index: 'blogIsTop', width: 60, formatter: isTopFormatter},
            {label: '博客分类', name: 'blogCategoryName', index: 'blogCategoryName', width: 60},
            {label: '添加时间', name: 'createTime', index: 'createTime', width: 90}
        ],
        height: 700,
        rowNum: 10,
        rowList: [10, 20, 50],
        styleUI: 'Bootstrap',
        loadtext: '信息读取中...',
        rownumbers: false,
        rownumWidth: 20,
        autowidth: true,
        multiselect: true,
        pager: "#jqGridPager",
        jsonReader: {
            root: "data.list",
            page: "data.currPage",
            total: "data.totalPage",
            records: "data.totalCount"
        },
        prmNames: {
            page: "page",
            rows: "limit",
            order: "order",
        },
        gridComplete: function () {
            //隐藏grid底部滚动条
            $("#jqGrid").closest(".ui-jqgrid-bdiv").css({"overflow-x": "hidden"});
        }
    });

    $(window).resize(function () {
        $("#jqGrid").setGridWidth($(".card-body").width());
    });

    function coverImageFormatter(cellvalue) {
        return "<img src='" + cellvalue + "' height=\"120\" width=\"160\" alt='coverImage'/>";
    }

    // function statusFormatter(cellvalue) {
    //     if (cellvalue == 0) {
    //         return "<button type=\"button\" class=\"btn btn-block btn-secondary btn-sm\" style=\"width: 50%;\">草稿1</button>";
    //     }
    //     else if (cellvalue == 1) {
    //         return "<button type=\"button\" class=\"btn btn-block btn-success btn-sm\" style=\"width: 50%;\">发布</button>";
    //     }
    // }

    function statusFormatter(cellvalue, options, rowdata) {
        var buttonClass = cellvalue === 0 ? 'btn-secondary' : 'btn-success';
        var buttonText = cellvalue === 0 ? '草稿' : '发布';
        // 注意这里为按钮添加了一个类名（status-button）和 data-id 属性来存储当前行的 ID
        return `<button type="button" class="btn btn-block ${buttonClass} btn-sm status-button" style="width: 50%;" data-id="${rowdata.blogId}">${buttonText}</button>`;
    }

    // 置顶按钮的格式化函数
    function isTopFormatter(cellvalue, options, rowdata) {
        var buttonClass = cellvalue === 0 ? 'btn-outline-secondary' : 'btn-warning';
        var buttonText = cellvalue === 0 ? '未置顶' : '已置顶';
        // 为置顶按钮添加一个类名和 data-id 属性来存储当前行的 ID
        return `<button type="button" class="btn btn-block ${buttonClass} btn-sm is-top-button" style="width: 50%;" data-id="${rowdata.blogId}">${buttonText}</button>`;
    }

    // 这个函数用于处理按钮点击事件
    function handleStatusButtonClick(event) {
        var blogId = $(event.currentTarget).data('id'); // 获取绑定的数据ID
        var confirmMessage = '您确定要改变该博客的状态吗？';

        if (confirm(confirmMessage)) {
            // 用户点击了“确定”，发送 AJAX 请求到后台接口
            $.ajax({
                url: '/admin/blogs/setblogsstatus',
                type: 'POST',
                contentType: 'application/json',
                data: JSON.stringify([blogId]), // 将 ID 包装成数组格式
                success: function(result) {
                    // 处理成功响应
                    alert('状态更新成功');
                    $("#jqGrid").trigger("reloadGrid"); // 重新加载表格
                },
                error: function(xhr, status, error) {
                    // 处理错误响应
                    alert('状态更新失败');
                }
            });
        }
    }

    // 这个函数用于处理按钮点击事件
    function handleIsTopButtonClick(event) {
        var blogId = $(event.currentTarget).data('id'); // 获取绑定的数据ID
        var confirmMessage = '您确定要修改文章的置顶状态吗？';

        if (confirm(confirmMessage)) {
            // 用户点击了“确定”，发送 AJAX 请求到后台接口
            $.ajax({
                url: '/admin/blogs/setblogsistop',
                type: 'POST',
                contentType: 'application/json',
                data: JSON.stringify([blogId]), // 将 ID 包装成数组格式
                success: function(result) {
                    // 处理成功响应
                    alert('状态更新成功');
                    $("#jqGrid").trigger("reloadGrid"); // 重新加载表格
                },
                error: function(xhr, status, error) {
                    // 处理错误响应
                    alert('状态更新失败');
                }
            });
        }
    }

    // 为状态按钮添加点击事件监听器
    $(document).on('click', '.status-button', handleStatusButtonClick);
    // 为置顶按钮添加点击事件监听器
    $(document).on('click', '.is-top-button', handleIsTopButtonClick);

});

/**
 * 搜索功能
 */
function search() {
    // 标题关键字
    var keyword = $('#keyword').val();
    if (!validLength(keyword, 20)) {
        swal("搜索字段长度过大!", {
            icon: "error",
        });
        return false;
    }
    // 数据封装
    var searchData = {keyword: keyword};
    // 传入查询条件参数
    $("#jqGrid").jqGrid("setGridParam", {postData: searchData});
    // 点击搜索按钮默认都从第一页开始
    $("#jqGrid").jqGrid("setGridParam", {page: 1});
    // 提交post并刷新表格
    $("#jqGrid").jqGrid("setGridParam", {url: '/admin/blogs/list'}).trigger("reloadGrid");
}

/**
 * jqGrid 重新加载
 */
function reload() {
    var page = $("#jqGrid").jqGrid('getGridParam', 'page');
    $("#jqGrid").jqGrid('setGridParam', {
        page: page
    }).trigger("reloadGrid");
}

function addBlog() {
    window.location.href = "/admin/blogs/edit";
}

function editBlog() {
    var id = getSelectedRow();
    if (id == null) {
        return;
    }
    window.location.href = "/admin/blogs/edit/" + id;
}

function deleteBlog() {
    var ids = getSelectedRows();
    if (ids == null) {
        return;
    }
    swal({
        title: "确认弹框",
        text: "确认要删除数据吗?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    }).then((flag) => {
            if (flag) {
                $.ajax({
                    type: "POST",
                    url: "/admin/blogs/delete",
                    contentType: "application/json",
                    data: JSON.stringify(ids),
                    success: function (r) {
                        if (r.resultCode == 200) {
                            swal("删除成功", {
                                icon: "success",
                            });
                            $("#jqGrid").trigger("reloadGrid");
                        } else {
                            swal(r.message, {
                                icon: "error",
                            });
                        }
                    }
                });
            }
        }
    );
}